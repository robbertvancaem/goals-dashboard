export const REVENUE_TARGET = 150000 // Revenue target
export const REVENUE_START = 29000
export const YEAR = 2023
export const CONVERSION_PERCENTAGE = 53

// Ported from Tailwind
export const COLORS = {
    PRIMARY: '#bae6fd',
    SECONDARY: '#f97516',
    GRAY: '#6b7280',
}
/**
 * The historical conversion from the Asana Sales Pipeline is 53%.
 */
export const POTENTIAL_TARGET =
    REVENUE_TARGET * (1 / (CONVERSION_PERCENTAGE * 0.01)) - REVENUE_START
export const TOTAL_BILLABLE_HOURS_TARGET = 107.5 // (3 * 25 + 1 * 20) => 5 billable hrs / day for Hulsman, Michiel, Brent and Robbert. Stoop counts as half.
export const TEAM_CAPACITY = 192 // 4 * 40 + 1 * 32 contracts

// Weeknumbers for goals
export const W_START = 34
export const W_END = 52

// Asana
export const ASANA_BASE_URL = 'https://app.asana.com/api/1.0'
export const ASANA_PAT = '1/1120705221057239:b395d0699f22f26af5d118ee2dd83dbf'
export const ASANA_DISCOVERY_GID = '1198188988213349'
export const ASANA_NEGOTIATION_GID = '1198188988213350'
export const ASANA_CLOSED_WON_GID = '1198186436621627'

// Harvest
export const HARVEST_BASE_URL = 'https://api.harvestapp.com/v2'
export const HARVEST_ACCOUNT_ID = '248528'
export const HARVEST_ACCESS_TOKEN =
    '1953251.pt.YvcY1h4hi-lGWF7o_nygqg-xyirqc1QRd9CGslVj5dPhVEQOSY0dGZBoKNUDx8TlnaFQf7bn-un0-fbCB8OHjw'
