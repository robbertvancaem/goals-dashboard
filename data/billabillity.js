import { getWeek, getWeekRange } from "utils/date";
import {
  W_START,
  W_END,
  TEAM_CAPACITY,
  TOTAL_BILLABLE_HOURS_TARGET,
} from "../constants";
import getTimeEntries from "./harvest/entries";

const billability = async () => {
  let billabillityGraphData = [];

  for (let w = W_START; w <= W_END; w++) {
    // Only run for weeks that are in the past, OR the current week
    const currentWeek = getWeek(new Date());

    if (w > currentWeek) {
      billabillityGraphData.push({
        name: `Week ${w}`,
        capacity: TEAM_CAPACITY,
        target: TOTAL_BILLABLE_HOURS_TARGET,
        total: 0,
        billable: 0,
      });
    } else {
      const { start, end } = getWeekRange(w);
      const entries = await getTimeEntries(
        start.toISOString(),
        end.toISOString()
      );

      const { total, billable } = entries.reduce(
        (agg, cur) => {
          return {
            total: agg.total + cur.total_hours,
            billable: agg.billable + cur.billable_hours,
          };
        },
        {
          total: 0,
          billable: 0,
        }
      );

      billabillityGraphData.push({
        name: `Week ${w}`,
        capacity: TEAM_CAPACITY,
        target: TOTAL_BILLABLE_HOURS_TARGET,
        total: Math.round(total),
        billable: Math.round(billable),
      });
    }
  }

  return billabillityGraphData;
};

export default billability;
