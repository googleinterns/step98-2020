import {twoDateObjectEqual} from '../../scripts/HelperFunctions';

// Receives a list of travelobjects and returns the travelobjects
// that is in front and after the timePoint
//   |----A------|  timePoint  |--B--| |-C--|  |-------D------|
// Return { prevTravelObject: A, nextTravelObject: B }
// If timePoint is in a travelobjects, return { prevTravelObject: undefined, nextTravelObject: undefined }
// If either A or B doesn't exist, return null for that prev[next]TravelObject
const searchForPrevAndNextTravelObject = (
  startOfDisplayDate,
  endOfDisplayDate,
  displayItems,
  timePoint
) => {
  if (displayItems.length == 0) {
    return { prevTravelObject: null, nextTravelObject: null };
  }

  // Create fake startOfDisplayDate and endOfDisplayDate travelObjects
  // to feed in searchForPrevAndNextTravelObjectHelperFunction

  let intervals = [];
  // If displayItems already includes a travelObject which starts from the previous date,
  // we don't create the fake start
  if (displayItems[0].startDate > startOfDisplayDate) {
    let fakeStart = {
      startDate: startOfDisplayDate,
      endDate: startOfDisplayDate,
    };
    intervals = [fakeStart];
  }

  intervals = intervals.concat(displayItems);

  // If displayItems already includes a travelObject which ends at the next date,
  // we don't create the fake end
  if (displayItems[displayItems.length - 1].endDate < endOfDisplayDate) {
    let fakeEnd = { startDate: endOfDisplayDate, endDate: endOfDisplayDate };
    intervals.push(fakeEnd);
  }

  return searchForPrevAndNextTravelObjectHelperFunction(
    startOfDisplayDate,
    intervals,
    timePoint
  );
};

function searchForPrevAndNextTravelObjectHelperFunction(
  startOfDisplayDate,
  intervals,
  timePoint
) {
  let low = 0;
  let high = intervals.length - 1;
  let prevTravelObject = undefined;
  let nextTravelObject = undefined;

  while (low <= high) {
    let centerIndex = Math.floor((low + high) / 2);
    let centerInterval = intervals[centerIndex];
    let prevCenterInterval =
      centerIndex - 1 >= 0 ? intervals[centerIndex - 1] : null;

    if (
      centerInterval.startDate <= timePoint &&
      timePoint <= centerInterval.startDate
    ) {
      // Check that centerInterval is not fake start or fake end
      if (centerInterval.id !== undefined) {
        if (twoDateObjectEqual(centerInterval.startDate, startOfDisplayDate)) {
          low = centerIndex + 1;
        } else {
          high = centerIndex - 1;
        }
      } else {
        return { prevTravelObject: undefined, nextTravelObject: undefined };
      }
    } else {
      if (timePoint < centerInterval.startDate) {
        // if intervals[0] is chosen as centerInterval, this condition is always true:
        // centerInterval.startDate <= timePoint
        // this means it can never go in here,
        // also means we don't have to check whether prevCenterInterval is null
        if (timePoint >= prevCenterInterval.endDate) {
          prevTravelObject =
            prevCenterInterval.id !== undefined ? prevCenterInterval : null;
          nextTravelObject =
            centerInterval.id !== undefined ? centerInterval : null;
          return {
            prevTravelObject: prevTravelObject,
            nextTravelObject: nextTravelObject,
          };
        } else {
          high = centerIndex - 1;
        }
      } else {
        low = centerIndex + 1;
      }
    }
  }

  return { prevTravelObject: undefined, nextTravelObject: undefined };
}

//Return the empty timeRange that users click into by performing binary search on emptySlots array
export const handleClickedTimePoint = (
  clickTimePoint,
  startOfDisplayDate,
  endOfDisplayDate,
  displayItems
) => {
  let prevAndNextTravelObject = searchForPrevAndNextTravelObject(
    startOfDisplayDate,
    endOfDisplayDate,
    displayItems,
    clickTimePoint
  );

  if (prevAndNextTravelObject.prevTravelObject === undefined) {
    prevAndNextTravelObject.freeTimeSlot = undefined;
    return prevAndNextTravelObject;
  }

  let prevTravelObjectEnd =
    prevAndNextTravelObject.prevTravelObject !== null
      ? prevAndNextTravelObject.prevTravelObject.endDate
      : startOfDisplayDate;
  let nextTravelObjectStart =
    prevAndNextTravelObject.nextTravelObject !== null
      ? prevAndNextTravelObject.nextTravelObject.startDate
      : endOfDisplayDate;
  let freeTimeSlot = {
    startDate: prevTravelObjectEnd,
    endDate: nextTravelObjectStart,
  };

  prevAndNextTravelObject.freeTimeSlot = freeTimeSlot;
  return prevAndNextTravelObject;
};
