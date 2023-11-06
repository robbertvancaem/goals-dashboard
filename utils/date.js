import { DateTime } from "luxon";

/**
 * This function takes a Date object and returns
 * the week number of that date.
 *
 * @param {*} date The date that you want to know the week of
 */

export const getWeek = (date) => {
  return DateTime.fromJSDate(date).weekNumber;
};

/**
 * This function takes a weeknumber and returns the
 * start and end date for that week as Date objects. Stole this
 * from https://stackoverflow.com/a/16591175/11465280
 *
 * @param {*} date
 */
export const getWeekRange = (week) => {
  const today = new Date();
  const currentWeek = getWeek(today);
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const startOfThisWeek = new Date(today.setDate(diff));

  let start = new Date(startOfThisWeek);
  start.setDate(today.getDate() - (currentWeek - week) * 7);

  let end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    week: week,
    start,
    end,
  };
};
