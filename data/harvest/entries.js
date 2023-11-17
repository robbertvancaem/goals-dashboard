import { TEAM_CAPACITY } from 'constants/index'

const randomWithinRange = (min, max) => Math.random() * (max - min) + min

const mockField = () => {
    const randomTotal = TEAM_CAPACITY * randomWithinRange(0.7, 1)

    return {
        total_hours: randomTotal,
        billable_hours: randomTotal * randomWithinRange(0.3, 1),
    }
}

const getEntries = async (from, to) => {
    if (!from || !to) {
        throw new Error("The parameters 'from' and 'to' need to be set")
    }

    return [mockField()]
}

export default getEntries
