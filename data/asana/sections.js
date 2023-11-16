import {
  ASANA_DISCOVERY_GID, ASANA_NEGOTIATION_GID, ASANA_CLOSED_WON_GID
} from '../../constants'

const discoveryMock = [{
  name: 'New TODO App',
  created_at: '08-21-2023',
  custom_fields: [{
    name: 'Value',
    display_value: 15000,
    number_value: 15000
  }, {
    name: 'Clients',
    display_value: 'Todoist'
  }]
}]

const negotationMock = [{
  name: 'New mobile app',
  created_at: '09-21-2023',
  custom_fields: [{
    name: 'Value',
    display_value: 15000,
    number_value: 15000
  },
  {
    name: 'Clients',
    display_value: 'WeAreMobile'
  }
  ]
}]

const closedMock = [{
  name: 'New TODO App',
  created_at: new Date(),
  custom_fields: [{
    name: 'Value',
    display_value: 15000,
    number_value: 15000
  }, {
    name: 'Clients',
    display_value: 'Client #1'
  }]
}]

const getMock = gid => {
  switch (gid) {
    case ASANA_DISCOVERY_GID:
      return discoveryMock
    case ASANA_NEGOTIATION_GID:
      return negotationMock
    case ASANA_CLOSED_WON_GID:
      return closedMock;
  }
}

export const getTasksFromSection = async (gid) => {
  return getMock(gid)
};
