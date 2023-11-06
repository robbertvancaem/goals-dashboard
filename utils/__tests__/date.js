import { getWeek } from "../date";

describe("getWeek", () => {
  test.each`
    dateString      | expectedWeek
    ${"2021-09-27"} | ${39}
    ${"2021-08-27"} | ${34}
    ${"2021-08-26"} | ${34}
    ${"2021-08-25"} | ${34}
    ${"2021-08-24"} | ${34}
  `("returns $expectedWeek for $dateString", ({ dateString, expectedWeek }) => {
    expect(getWeek(new Date(dateString))).toBe(expectedWeek);
  });
});
