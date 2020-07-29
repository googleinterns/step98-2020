export const getEmptySlots = (startOfDisplayDate, endOfDisplayDate, displayItems) => {
  let emptySlots = [];

  if (displayItems.length == 0) {
    emptySlots.push({
      startDate: startOfDisplayDate,
      endDate: endOfDisplayDate,
    });
    return emptySlots;
  } else {
    if (displayItems[0].startDate > startOfDisplayDate) {
      emptySlots.push({
        startDate: startOfDisplayDate,
        endDate: displayItems[0].startDate,
      });
    }
  }

  for (var i = 1; i <= displayItems.length - 1; i++) {
    let prev = displayItems[i - 1];
    let cur = displayItems[i];

    emptySlots.push({ startDate: prev.endDate, endDate: cur.startDate });
  }

  if (displayItems[displayItems.length - 1].endDate < endOfDisplayDate) {
    emptySlots.push({
      startDate: displayItems[displayItems.length - 1].endDate,
      endDate: endOfDisplayDate,
    });
  }

  return emptySlots;
};
// return whether timeRange from startDate to endDate contains timePoint
const contains = (interval, timePoint) => {
  return interval.startDate <= timePoint && timePoint <= interval.endDate;
};

//Receives a list of non-overlapping intervals and 2 timepoints,
// return a timePoint that belongs to interval [timePointStart, timePointEnd] and an interval from the give list.
const searchForOverlappingPoint = (intervals,timePointStart,timePointEnd) => {
  if (intervals === undefined || intervals.length == 0) {
    return timePointStart;
  }
  let low = 0;
  let high = intervals.length - 1;

  while (low <= high) {
    let centerIndex = Math.floor((low + high) / 2);
    let centerInterval = intervals[centerIndex];
    if (contains(centerInterval, timePointStart)) {
      return timePointStart;
    } else if (contains(centerInterval, timePointEnd)) {
      return timePointEnd;
    } else if (timePointEnd < centerInterval.startDate) {
      high = centerIndex - 1;
    } else {
      low = centerIndex + 1;
    }
  }

  return null;
};

//Receives a list of travelobjects and returns the travelobjects that is in front and after the timePoint
//fakeStart    |----A------|  timePoint  |--B--| |-C--|  |-------D------|         fakeEnd
//return {A, {startDate: B}
//if timePoint is in a travelobjects, return undefined for both A and B
//if either A or B doesn't exist, return null for that travelobject
const searchForPrevAndNextTravelObject = (startOfDisplayDate, endOfDisplayDate, displayItems, timePoint) => {
  if (displayItems.length == 0) {
    return { prevTravelObject: null, nextTravelObject: null };
  }

  let intervals = [];
  if (displayItems[0].startDate > startOfDisplayDate) {
    let fakeStart = {
      startDate: startOfDisplayDate,
      endDate: startOfDisplayDate,
    };
    intervals = [fakeStart];
  }

  intervals = intervals.concat(displayItems);

  if (displayItems[displayItems.length - 1].endDate < endOfDisplayDate) {
    let fakeEnd = { startDate: endOfDisplayDate, endDate: endOfDisplayDate };
    intervals.push(fakeEnd);
  }

  return searchForPrevAndNextTravelObjectHelperFunction(startOfDisplayDate, endOfDisplayDate, intervals, timePoint);
};

function searchForPrevAndNextTravelObjectHelperFunction(startOfDisplayDate, endOfDisplayDate, intervals, timePoint) {
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
      if (centerInterval.id !== undefined) {
        if (centerInterval.startDate === startOfDisplayDate) {
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
export const handleClickedTimePoint = (idV, startOfDisplayDate, endOfDisplayDate, displayItems, emptySlots) => {
  let timePointStart = new Date(
    startOfDisplayDate.getFullYear(),
    startOfDisplayDate.getMonth(),
    startOfDisplayDate.getDate(),
    idV.slice(0, 2),
    idV.slice(3),
    0
  );

  let timePointEnd = new Date(timePointStart);
  timePointEnd.setTime(timePointEnd.getTime() + 30 * 60000);
  let overlappingPoint = searchForOverlappingPoint(emptySlots,timePointStart,timePointEnd);
  if (overlappingPoint === null) {
    return { prevTravelObject: undefined, freeTimeSlot: undefined, nextTravelObject: undefined };
  }
  let prevAndNextTravelObject = searchForPrevAndNextTravelObject(startOfDisplayDate, endOfDisplayDate, displayItems, overlappingPoint)
  
  if (prevAndNextTravelObject.prevTravelObject === undefined) {
    prevAndNextTravelObject.freeTimeSlot = undefined;
    return prevAndNextTravelObject;
  }

  let prevTravelObjectEnd = (prevAndNextTravelObject.prevTravelObject !== null)? prevAndNextTravelObject.prevTravelObject.endDate : startOfDisplayDate;
  let nextTravelObjectStart = (prevAndNextTravelObject.nextTravelObject !== null)? prevAndNextTravelObject.nextTravelObject.startDate : endOfDisplayDate;
  let freeTimeSlot = {startDate: prevTravelObjectEnd, endDate: nextTravelObjectStart}

  prevAndNextTravelObject.freeTimeSlot = freeTimeSlot;
  return prevAndNextTravelObject;
};
