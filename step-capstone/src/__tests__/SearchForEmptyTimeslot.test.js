import "@testing-library/jest-dom";
import { handleClickedTimePoint } from "../components/Sidebars/HandleClickedTimePoint";
// TEST DATA
const TIMEPOINT_2300_PREVDAY = new Date("2020-08-06T23:00:00Z");

const TIMEPOINT_0000 = new Date("2020-08-07T00:00:00Z");
const TIMEPOINT_0100 = new Date("2020-08-07T01:00:00Z");
const TIMEPOINT_0109 = new Date("2020-08-07T01:09:00Z");
const TIMEPOINT_0115 = new Date("2020-08-07T01:15:00Z");

const TIMEPOINT_0230 = new Date("2020-08-07T02:30:00Z");

const TIMEPOINT_0301 = new Date("2020-08-07T03:01:00Z");
const TIMEPOINT_0315 = new Date("2020-08-07T03:15:00Z");
const TIMEPOINT_0330 = new Date("2020-08-07T03:30:00Z");

const TIMEPOINT_0500 = new Date("2020-08-07T05:00:00Z");
const TIMEPOINT_0515 = new Date("2020-08-07T05:15:00Z");

const TIMEPOINT_0645 = new Date("2020-08-07T06:45:00Z");

const TIMEPOINT_0830 = new Date("2020-08-07T08:30:00Z");

const TIMEPOINT_0915 = new Date("2020-08-07T09:15:00Z");
const TIMEPOINT_0945 = new Date("2020-08-07T09:45:00Z");

const TIMEPOINT_1000 = new Date("2020-08-07T10:00:00Z");

const TIMEPOINT_1315 = new Date("2020-08-07T13:15:00Z");
const TIMEPOINT_1330 = new Date("2020-08-07T13:30:00Z");
const TIMEPOINT_1345 = new Date("2020-08-07T13:45:00Z");

const TIMEPOINT_1400 = new Date("2020-08-07T14:00:00Z");
const TIMEPOINT_1430 = new Date("2020-08-07T14:30:00Z");

const TIMEPOINT_1659 = new Date("2020-08-07T16:59:00Z");
const TIMEPOINT_1700 = new Date("2020-08-07T17:00:00Z");
const TIMEPOINT_1715 = new Date("2020-08-07T17:15:00Z");
const TIMEPOINT_1718 = new Date("2020-08-07T17:18:00Z");
const TIMEPOINT_1730 = new Date("2020-08-07T17:30:00Z");
const TIMEPOINT_1745 = new Date("2020-08-07T17:45:00Z");
const TIMEPOINT_1746 = new Date("2020-08-07T17:46:00Z");

const TIMEPOINT_1800 = new Date("2020-08-07T18:00:00Z");
const TIMEPOINT_2245 = new Date("2020-08-07T22:45:00Z");
const TIMEPOINT_2246 = new Date("2020-08-07T22:46:00Z");

const TIMEPOINT_2300 = new Date("2020-08-07T23:00:00Z");
const TIMEPOINT_2330 = new Date("2020-08-07T23:30:00Z");
const TIMEPOINT_2331 = new Date("2020-08-07T23:31:00Z");

const TIMEPOINT_0100_NEXTDAY = new Date("2020-08-08T01:00:00Z");

const startOfDisplayDate = TIMEPOINT_0000;
const endOfDisplayDate = new Date("2020-08-07T23:59:59Z");

const ITEM_2300_PREV_DAY_TO_0100 = {
  id: "random",
  startDate: TIMEPOINT_2300_PREVDAY,
  endDate: TIMEPOINT_0100,
};
const ITEM_2300_TO_0100_NEXT_DAY = {
  id: "random",
  startDate: TIMEPOINT_2300,
  endDate: TIMEPOINT_0100_NEXTDAY,
};
const ITEM_1_0115_TO_0230 = {
  id: "random",
  startDate: TIMEPOINT_0115,
  endDate: TIMEPOINT_0230,
};
const ITEM_2_0230_TO_0315 = {
  id: "random",
  startDate: TIMEPOINT_0230,
  endDate: TIMEPOINT_0315,
};
const ITEM_3_0330_TO_0500 = {
  id: "random",
  startDate: TIMEPOINT_0330,
  endDate: TIMEPOINT_0500,
};
const ITEM_4_0515_TO_0645 = {
  id: "random",
  startDate: TIMEPOINT_0515,
  endDate: TIMEPOINT_0645,
};
const ITEM_5_0915_TO_1345 = {
  id: "random",
  startDate: TIMEPOINT_0915,
  endDate: TIMEPOINT_1345,
};
const ITEM_6_1345_TO_1400 = {
  id: "random",
  startDate: TIMEPOINT_1345,
  endDate: TIMEPOINT_1400,
};
const ITEM_7_1430_TO_1700 = {
  id: "random",
  startDate: TIMEPOINT_1430,
  endDate: TIMEPOINT_1700,
};
const ITEM_8_1700_TO_1715 = {
  id: "random",
  startDate: TIMEPOINT_1700,
  endDate: TIMEPOINT_1715,
};
const ITEM_9_1730_TO_1745 = {
  id: "random",
  startDate: TIMEPOINT_1730,
  endDate: TIMEPOINT_1745,
};
const ITEM_10_1800_TO_2245 = {
  id: "random",
  startDate: TIMEPOINT_1800,
  endDate: TIMEPOINT_2245,
};
const ITEM_11_2300_TO_2330 = {
  id: "random",
  startDate: TIMEPOINT_2300,
  endDate: TIMEPOINT_2330,
};
const ITEM_12_0000_TO_2359 = {
  id: "random",
  startDate: startOfDisplayDate,
  endDate: endOfDisplayDate,
};

const EMPTY_DAY = [];

const ONE_ITEM_OVERFLOWS_FROM_PREV_DAY = [ITEM_2300_PREV_DAY_TO_0100];
const ONE_ITEM_OVERFLOWS_TO_NEXT_DAY = [ITEM_2300_TO_0100_NEXT_DAY];
const ONE_ITEM_IN_THE_MIDDLE = [ITEM_5_0915_TO_1345];

const TWO_ITEMS_NOT_RELATE_TO_PREV_OR_NEXT_DAY = [
  ITEM_2_0230_TO_0315,
  ITEM_8_1700_TO_1715,
];
const TWO_ITEMS_ONE_FROM_PREV_ANOTHER_MIDDLE = [
  ITEM_2300_PREV_DAY_TO_0100,
  ITEM_5_0915_TO_1345,
];
const TWO_ITEMS_ONE_TO_NEXT_DAY = [
  ITEM_5_0915_TO_1345,
  ITEM_2300_TO_0100_NEXT_DAY,
];

const THREE_ITEMS_WITH_2_ITEMS_SAME_EDGE = [
  ITEM_1_0115_TO_0230,
  ITEM_2_0230_TO_0315,
  ITEM_5_0915_TO_1345,
];
const THREE_ITEMS_WITH_2_SHORT_ITEMS = [
  ITEM_8_1700_TO_1715,
  ITEM_9_1730_TO_1745,
  ITEM_11_2300_TO_2330,
];
const THREE_ITEMS_RELATE_TO_PREV_AND_NEXT_DAY = [
  ITEM_2300_PREV_DAY_TO_0100,
  ITEM_3_0330_TO_0500,
  ITEM_2300_TO_0100_NEXT_DAY,
];

const FOUR_ITEMS = [
  ITEM_1_0115_TO_0230,
  ITEM_3_0330_TO_0500,
  ITEM_6_1345_TO_1400,
  ITEM_7_1430_TO_1700,
  ITEM_8_1700_TO_1715,
];
const FOUR_ITEMS_RELATE_TO_PREV_AND_NEXT_DAY = [
  ITEM_2300_PREV_DAY_TO_0100,
  ITEM_1_0115_TO_0230,
  ITEM_2_0230_TO_0315,
  ITEM_2300_TO_0100_NEXT_DAY,
];

const FIVE_ITEMS = [
  ITEM_5_0915_TO_1345,
  ITEM_7_1430_TO_1700,
  ITEM_9_1730_TO_1745,
  ITEM_10_1800_TO_2245,
  ITEM_11_2300_TO_2330,
];
const ONE_FULL_DAY = [ITEM_12_0000_TO_2359];

// TEST handleClickedTimePoint(clickTimePoint, startOfDisplayDate, endOfDisplayDate, displayItems)
// Assumption is that no two items in displayItems overlaps
test("Case 0: Empty day and clickPoint at the startOfDisplayDate", () => {
  expect(
    handleClickedTimePoint(
      startOfDisplayDate,
      startOfDisplayDate,
      endOfDisplayDate,
      EMPTY_DAY
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: { startDate: startOfDisplayDate, endDate: endOfDisplayDate },
    nextTravelObject: null,
  });
});

test("Case 1: Empty day and clickPoint at the endOfDisplayDate", () => {
  expect(
    handleClickedTimePoint(
      endOfDisplayDate,
      startOfDisplayDate,
      endOfDisplayDate,
      EMPTY_DAY
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: { startDate: startOfDisplayDate, endDate: endOfDisplayDate },
    nextTravelObject: null,
  });
});

test("Case 2: Empty day and clickPoint at the middle of displayDate", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1315,
      startOfDisplayDate,
      endOfDisplayDate,
      EMPTY_DAY
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: { startDate: startOfDisplayDate, endDate: endOfDisplayDate },
    nextTravelObject: null,
  });
});

test("Case 3: ClickPoint is in travelObject", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1000,
      startOfDisplayDate,
      endOfDisplayDate,
      ONE_ITEM_IN_THE_MIDDLE
    )
  ).toStrictEqual({
    prevTravelObject: undefined,
    freeTimeSlot: undefined,
    nextTravelObject: undefined,
  });
});

test("Case 4: One travelobject overflows from the previous day and clickPoint is in the part of the day after overflow event", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1000,
      startOfDisplayDate,
      endOfDisplayDate,
      ONE_ITEM_OVERFLOWS_FROM_PREV_DAY
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_2300_PREV_DAY_TO_0100,
    freeTimeSlot: {startDate: TIMEPOINT_0100, endDate: endOfDisplayDate},
    nextTravelObject: null,
  });
});

test("Case 5: One travelobject overflows to the next day and clickPoint is in the part of the day before overflow event", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1000,
      startOfDisplayDate,
      endOfDisplayDate,
      ONE_ITEM_OVERFLOWS_TO_NEXT_DAY
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: {startDate: startOfDisplayDate, endDate: TIMEPOINT_2300},
    nextTravelObject: ITEM_2300_TO_0100_NEXT_DAY,
  });
});

test("Case 6: One travelobject in the middle of displayDate and clickPoint is in the first empty portion of displayDate", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0500,
      startOfDisplayDate,
      endOfDisplayDate,
      ONE_ITEM_IN_THE_MIDDLE
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: {startDate: startOfDisplayDate, endDate: TIMEPOINT_0915},
    nextTravelObject: ITEM_5_0915_TO_1345,
  });
});

test("Case 7: One travelobject in the middle of displayDate and clickPoint is in the second empty portion of displayDate", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1400,
      startOfDisplayDate,
      endOfDisplayDate,
      ONE_ITEM_IN_THE_MIDDLE
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_5_0915_TO_1345,
    freeTimeSlot: {startDate: TIMEPOINT_1345, endDate: endOfDisplayDate},
    nextTravelObject: null,
  });
});

test("Case 8: Two items in the middle of the day and a clickPoint in between two items", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1400,
      startOfDisplayDate,
      endOfDisplayDate,
      TWO_ITEMS_NOT_RELATE_TO_PREV_OR_NEXT_DAY
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_2_0230_TO_0315,
    freeTimeSlot: {startDate: TIMEPOINT_0315, endDate: TIMEPOINT_1700},
    nextTravelObject: ITEM_8_1700_TO_1715,
  });
});

test("Case 9: Two items in the middle of the day and a clickPoint in front of the first item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0100,
      startOfDisplayDate,
      endOfDisplayDate,
      TWO_ITEMS_NOT_RELATE_TO_PREV_OR_NEXT_DAY
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: {startDate: startOfDisplayDate, endDate: TIMEPOINT_0230},
    nextTravelObject: ITEM_2_0230_TO_0315,
  });
});

test("Case 10: Two items in the middle of the day and a clickPoint after the second item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1800,
      startOfDisplayDate,
      endOfDisplayDate,
      TWO_ITEMS_NOT_RELATE_TO_PREV_OR_NEXT_DAY
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_8_1700_TO_1715,
    freeTimeSlot: {startDate: TIMEPOINT_1715, endDate: endOfDisplayDate},
    nextTravelObject: null,
  });
});

test("Case 11: Two items one of which overflows from the previous day and clickPoint in between two items", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0230,
      startOfDisplayDate,
      endOfDisplayDate,
      TWO_ITEMS_ONE_FROM_PREV_ANOTHER_MIDDLE
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_2300_PREV_DAY_TO_0100,
    freeTimeSlot: {startDate: TIMEPOINT_0100, endDate: TIMEPOINT_0915},
    nextTravelObject: ITEM_5_0915_TO_1345,
  });
});

test("Case 12: Two items one of which overflows from the previous day and clickPoint after the second item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1400,
      startOfDisplayDate,
      endOfDisplayDate,
      TWO_ITEMS_ONE_FROM_PREV_ANOTHER_MIDDLE
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_5_0915_TO_1345,
    freeTimeSlot: {startDate: TIMEPOINT_1345, endDate: endOfDisplayDate},
    nextTravelObject: null,
  });
});

test("Case 13: Two items one of which overflows from the previous day and clickPoint in the first item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0000,
      startOfDisplayDate,
      endOfDisplayDate,
      TWO_ITEMS_ONE_FROM_PREV_ANOTHER_MIDDLE
    )
  ).toStrictEqual({
    prevTravelObject: undefined,
    freeTimeSlot: undefined,
    nextTravelObject: undefined,
  });
});

test("Case 14: Two items one of which overflows from the previous day and clickPoint in the second item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0945,
      startOfDisplayDate,
      endOfDisplayDate,
      TWO_ITEMS_ONE_FROM_PREV_ANOTHER_MIDDLE
    )
  ).toStrictEqual({
    prevTravelObject: undefined,
    freeTimeSlot: undefined,
    nextTravelObject: undefined,
  });
});

test("Case 15: Three items two of which share the same edge, clickPoint is between of second and third item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0645,
      startOfDisplayDate,
      endOfDisplayDate,
      THREE_ITEMS_WITH_2_ITEMS_SAME_EDGE
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_2_0230_TO_0315,
    freeTimeSlot: {startDate: TIMEPOINT_0315, endDate: TIMEPOINT_0915},
    nextTravelObject: ITEM_5_0915_TO_1345,
  });
});

test("Case 16: Three items with two short items, clickPoint is in middle of two short items", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1718,
      startOfDisplayDate,
      endOfDisplayDate,
      THREE_ITEMS_WITH_2_SHORT_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_8_1700_TO_1715,
    freeTimeSlot: {startDate: TIMEPOINT_1715, endDate: TIMEPOINT_1730},
    nextTravelObject: ITEM_9_1730_TO_1745,
  });
});

test("Case 17: Three items with two short items, clickPoint is in front of the first short item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1659,
      startOfDisplayDate,
      endOfDisplayDate,
      THREE_ITEMS_WITH_2_SHORT_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: {startDate: startOfDisplayDate, endDate: TIMEPOINT_1700},
    nextTravelObject: ITEM_8_1700_TO_1715,
  });
});

test("Case 18: Three items with two short items, clickPoint is after the second short item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1800,
      startOfDisplayDate,
      endOfDisplayDate,
      THREE_ITEMS_WITH_2_SHORT_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_9_1730_TO_1745,
    freeTimeSlot: {startDate: TIMEPOINT_1745, endDate: TIMEPOINT_2300},
    nextTravelObject: ITEM_11_2300_TO_2330,
  });
});

test("Case 19: Three items, clickPoint is after the third item", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_2331,
      startOfDisplayDate,
      endOfDisplayDate,
      THREE_ITEMS_WITH_2_SHORT_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_11_2300_TO_2330,
    freeTimeSlot: {startDate: TIMEPOINT_2330, endDate: endOfDisplayDate},
    nextTravelObject: null,
  });
});

test("Case 20: Three items one of which overflows from the previous date, one of the others overflows to the next date, clickPoint is in the between the first and second items", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0230,
      startOfDisplayDate,
      endOfDisplayDate,
      THREE_ITEMS_RELATE_TO_PREV_AND_NEXT_DAY
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_2300_PREV_DAY_TO_0100,
    freeTimeSlot: {startDate: TIMEPOINT_0100, endDate: TIMEPOINT_0330},
    nextTravelObject: ITEM_3_0330_TO_0500,
  });
});


test("Case 21: Three items one of which overflows from the previous date, one of the others overflows to the next date, clickPoint is in the between the second and third items", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0645,
      startOfDisplayDate,
      endOfDisplayDate,
      THREE_ITEMS_RELATE_TO_PREV_AND_NEXT_DAY
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_3_0330_TO_0500,
    freeTimeSlot: {startDate: TIMEPOINT_0500, endDate: TIMEPOINT_2300},
    nextTravelObject: ITEM_2300_TO_0100_NEXT_DAY,
  });
});

test("Case 22: Four items in the middle of displayDate, clickPoint between 1st and 2nd", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0301,
      startOfDisplayDate,
      endOfDisplayDate,
      FOUR_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_1_0115_TO_0230,
    freeTimeSlot: {startDate: TIMEPOINT_0230, endDate: TIMEPOINT_0330},
    nextTravelObject: ITEM_3_0330_TO_0500,
  });
});

test("Case 23: Four items in the middle of displayDate, clickPoint between 2nd and 3rd items", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0645,
      startOfDisplayDate,
      endOfDisplayDate,
      FOUR_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_3_0330_TO_0500,
    freeTimeSlot: {startDate: TIMEPOINT_0500, endDate: TIMEPOINT_1345},
    nextTravelObject: ITEM_6_1345_TO_1400,
  });
});
test("Case 24: Four items one of which overflows from previous date and one of the others overflows to the next date", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0109,
      startOfDisplayDate,
      endOfDisplayDate,
      FOUR_ITEMS_RELATE_TO_PREV_AND_NEXT_DAY
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_2300_PREV_DAY_TO_0100,
    freeTimeSlot: {startDate: TIMEPOINT_0100, endDate: TIMEPOINT_0115},
    nextTravelObject: ITEM_1_0115_TO_0230,
  });
});

test("Case 25: Five items, Clickpoint is in the last free timeslot of the day", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_2331,
      startOfDisplayDate,
      endOfDisplayDate,
      FIVE_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_11_2300_TO_2330,
    freeTimeSlot: {startDate: TIMEPOINT_2330, endDate: endOfDisplayDate},
    nextTravelObject: null,
  });
});

test("Case 26: Five items, clickPoint is in the 1st free timeslot of the day", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_0100,
      startOfDisplayDate,
      endOfDisplayDate,
      FIVE_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: null,
    freeTimeSlot: {startDate: startOfDisplayDate, endDate: TIMEPOINT_0915},
    nextTravelObject: ITEM_5_0915_TO_1345,
  });
});

test("Case 27: Five items, clickPoint is in the 2nd free timeslot of the day", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1400,
      startOfDisplayDate,
      endOfDisplayDate,
      FIVE_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_5_0915_TO_1345,
    freeTimeSlot: {startDate: TIMEPOINT_1345, endDate: TIMEPOINT_1430},
    nextTravelObject: ITEM_7_1430_TO_1700,
  });
});

test("Case 28: Five items, clickPoint is in the 3rd free timeslot", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1715,
      startOfDisplayDate,
      endOfDisplayDate,
      FIVE_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_7_1430_TO_1700,
    freeTimeSlot: {startDate: TIMEPOINT_1700, endDate: TIMEPOINT_1730},
    nextTravelObject: ITEM_9_1730_TO_1745,
  });
});

test("Case 29: Five items, clickPoint is in the 4th free timeslot", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_1746,
      startOfDisplayDate,
      endOfDisplayDate,
      FIVE_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_9_1730_TO_1745,
    freeTimeSlot: {startDate: TIMEPOINT_1745, endDate: TIMEPOINT_1800},
    nextTravelObject: ITEM_10_1800_TO_2245,
  });
});

test("Case 30: Five items, clickPoint is in the 5th free timeslot", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_2246,
      startOfDisplayDate,
      endOfDisplayDate,
      FIVE_ITEMS
    )
  ).toStrictEqual({
    prevTravelObject: ITEM_10_1800_TO_2245,
    freeTimeSlot: {startDate: TIMEPOINT_2245, endDate: TIMEPOINT_2300},
    nextTravelObject: ITEM_11_2300_TO_2330,
  });
});

test("Case 31: One full day, clickPoint is in the item ", () => {
  expect(
    handleClickedTimePoint(
      TIMEPOINT_2331,
      startOfDisplayDate,
      endOfDisplayDate,
      ONE_FULL_DAY
    )
  ).toStrictEqual({
    prevTravelObject: undefined,
    freeTimeSlot: undefined,
    nextTravelObject: undefined,
  });
});