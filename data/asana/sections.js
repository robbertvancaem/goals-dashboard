import {
    ASANA_DISCOVERY_GID,
    ASANA_NEGOTIATION_GID,
    ASANA_CLOSED_WON_GID,
    YEAR,
} from '../../constants'

const mockField = (name, created, value, client) => ({
    name,
    created_at: created,
    custom_fields: [
        {
            name: 'Value',
            display_value: value,
            number_value: value,
        },
        {
            name: 'Clients',
            display_value: client,
        },
    ],
})

const discoveryMock = [
    mockField('New TODO app', `08-21-${YEAR}`, 15000, 'Todoist Inc.'),
    mockField('Configurator tool', `08-24-${YEAR}`, 7500, 'Euvel Corp.'),
    mockField('Christmas app', `11-25-${YEAR}`, 7500, 'Santa Ltd'),
]

const negotationMock = [
    mockField('New mobile app', `09-21-${YEAR}`, 23123, 'WeAreMobile'),
    mockField('Portfolio v1', `12-16-${YEAR}`, 7250, 'DarkWebz'),
]

const closedMock = [
    mockField('Rebranding', `10-01-${YEAR}`, 27500, 'Aviation 3000'),
    mockField('Website', `12-16-${YEAR}`, 30775, 'Kings of Schrobbeler'),
]

const getMock = (gid) => {
    switch (gid) {
        case ASANA_DISCOVERY_GID:
            return discoveryMock
        case ASANA_NEGOTIATION_GID:
            return negotationMock
        case ASANA_CLOSED_WON_GID:
            return closedMock
    }
}

export const getTasksFromSection = async (gid) => {
    return getMock(gid)
}
