import { getWeek } from 'utils/date'
import {
    REVENUE_TARGET,
    POTENTIAL_TARGET,
    ASANA_DISCOVERY_GID,
    ASANA_NEGOTIATION_GID,
    ASANA_CLOSED_WON_GID,
    W_START,
    W_END,
    REVENUE_START,
    YEAR,
} from '../constants'
import { getTasksFromSection } from './asana/sections'

const revenue = async () => {
    let revenueGraphData = []
    const discovery = await getTasksFromSection(ASANA_DISCOVERY_GID)
    const negotiated = await getTasksFromSection(ASANA_NEGOTIATION_GID)
    const won = await getTasksFromSection(ASANA_CLOSED_WON_GID)

    for (let w = W_START; w <= W_END; w++) {
        // Fill it with initial data
        revenueGraphData.push({
            name: `Week ${w}`,
            potentialTarget:
                REVENUE_START +
                Math.round(
                    ((POTENTIAL_TARGET - REVENUE_START) / (W_END - W_START)) *
                        (w - W_START)
                ),
            potentialRealised: REVENUE_START,
            revenueTarget:
                REVENUE_START +
                Math.round(
                    ((REVENUE_TARGET - REVENUE_START) / (W_END - W_START)) *
                        (w - W_START)
                ),
            revenueRealised: REVENUE_START,
            entries: [],
        })
    }

    // Potential value
    for (const task of [...discovery, ...negotiated]) {
        const { created_at, name, custom_fields } = task

        // Get week number of task
        const date = new Date(created_at)
        const year = date.getFullYear()

        // Only include data from this year
        if (year !== YEAR) {
            continue
        }
        const week = getWeek(date)

        // If its week of modification is outside of bounds, ignore it
        if (week < W_START || week > W_END) {
            continue
        }

        // Lookup what the value is and add it to the revenueData
        const valueField = custom_fields.find(({ name }) => name === 'Value')
        const clientField = custom_fields.find(({ name }) => name === 'Clients')

        const { display_value, number_value } = valueField

        // Only add entries that have generated actual value
        if (number_value <= 0) {
            continue
        }

        // Add it as entry to the appropriate week
        revenueGraphData[week - W_START].entries.push({
            name,
            value: display_value,
            type: 'Potential',
            client: clientField['display_value'],
            date: date.toLocaleDateString(),
        })

        /**
         * Since it's cumulative, also increase all weeks after this week.
         * This could and should be improved for performance in the future (aggregation)
         */
        for (let w = week; w <= W_END; w++) {
            revenueGraphData[w - W_START][`potentialRealised`] =
                revenueGraphData[w - W_START][`potentialRealised`] +
                number_value
        }
    }

    // Realised value
    for (const task of won) {
        const { created_at, name, custom_fields } = task

        // Get week number of task
        const date = new Date(created_at)
        const year = date.getFullYear()

        // Only include data from this year
        if (year !== YEAR) {
            continue
        }

        const week = getWeek(date)

        // If its week of modification is outside of bounds, ignore it
        if (week < W_START || week > W_END) {
            continue
        }

        // Lookup what the value is and add it to the revenueData
        const valueField = custom_fields.find(({ name }) => name === 'Value')
        const clientField = custom_fields.find(({ name }) => name === 'Clients')

        const { display_value, number_value } = valueField

        // Only add entries that have generated actual value
        if (number_value <= 0) {
            continue
        }

        // Add it as entry to the appropriate week
        revenueGraphData[week - W_START].entries.push({
            name,
            value: display_value,
            type: 'Won',
            client: clientField['display_value'],
            date: date.toLocaleDateString(),
        })

        /**
         * Since it's cumulative, also increase all weeks after this week.
         * This could and should be improved for performance in the future (aggregation)
         */
        for (let w = week; w <= W_END; w++) {
            revenueGraphData[w - W_START][`potentialRealised`] =
                revenueGraphData[w - W_START][`potentialRealised`] +
                number_value
            revenueGraphData[w - W_START][`revenueRealised`] =
                revenueGraphData[w - W_START][`revenueRealised`] + number_value
        }
    }

    return revenueGraphData
}

export default revenue
