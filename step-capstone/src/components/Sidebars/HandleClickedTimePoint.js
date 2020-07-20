/*Receives a list of travelobjects and returns the travelobjects that is in front and after the timePoint
  start    |----A------|  timePoint  |--B--| |-C--|  |-------D------|         fakeTravelObject
  return {A, {startDate: B}
  if timePoint is in a travelobjects, return undefined for both A and B
  if either A or B doesn't exist, return null for that travelobject
  
*/
const binarySearch = (startOfDisplayDate, endOfDisplayDate, displayItems, timePoint) => {
  if (displayItems.length == 0) {
    return {prevTravelObject: null, nextTravelObject: null};
  }

  let intervals = [];
  if (displayItems[0].startDate > startOfDisplayDate) {
    let fakeStart = {startDate: startOfDisplayDate, endDate: startOfDisplayDate};
    intervals = [fakeStart]
  }
  
  intervals = intervals.concat(displayItems);

  if (displayItems[displayItems.length - 1].endDate < endOfDisplayDate) {
    let fakeEnd = {startDate: endOfDisplayDate, endDate: endOfDisplayDate};
    intervals.push(fakeEnd);
  }
  

  let low = 0;
  let high = intervals.length - 1;
  let prevTravelObject = undefined;
  let nextTravelObject = undefined;

  while (low <= high) {
    let centerIndex = Math.floor((low + high) / 2);
    let centerInterval = intervals[centerIndex];
    let prevCenterInterval = (centerIndex - 1 >= 0)? intervals[centerIndex - 1] : null;

    if (centerInterval.startDate <= timePoint && timePoint <= centerInterval.startDate) {
      if (centerInterval.id !== undefined) {
        if (centerInterval.startDate === startOfDisplayDate) {
          low = centerIndex + 1;
        }
        else {
          high = centerIndex - 1;
        }
      }
      else {
        return {prevTravelObject: undefined, nextTravelObject: undefined};
      }
    }
    else {
      if (timePoint < centerInterval.startDate) {
      // if intervals[0] is chosen as centerInterval, this condition is always true: 
      // centerInterval.startDate <= timePoint
      // this means it can never go in here,
      // also means we don't have to check whether prevCenterInterval is null
        if (timePoint >= prevCenterInterval.endDate) {
          prevTravelObject = (prevCenterInterval.id !== undefined)? prevCenterInterval: null;
          nextTravelObject = (centerInterval.id !== undefined)? centerInterval: null;
          return {prevTravelObject: prevTravelObject, nextTravelObject: nextTravelObject};

        } else {
          high = centerIndex - 1;
        }
        
      } else {
        low = centerIndex + 1;
      }
    }

    
  }

  return {prevTravelObject: undefined, nextTravelObject: undefined};
};

/*Return the empty timeRange that users click into by performing binary search on emptySlots array*/
export const handleClickedTimePoint = (idV, displayDate, displayItems) => {
  let clickedTime = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth(),
    displayDate.getDate(),
    idV.slice(0, 2),
    idV.slice(3),
    0
  );
  
  let startOfDisplayDate = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth(),
    displayDate.getDate(),
    0,
    0,
    0
  );

  let endOfDisplayDate = new Date(
    displayDate.getFullYear(),
    displayDate.getMonth(),
    displayDate.getDate(),
    23,
    59,
    59
  );

  let searchResult = binarySearch(startOfDisplayDate, endOfDisplayDate, displayItems, clickedTime);
  if (searchResult.prevTravelObject === undefined) {
    searchResult.freeTimeSlot = undefined;
    return searchResult;
  }

  let prevTravelObjectEnd = (searchResult.prevTravelObject !== null)? searchResult.prevTravelObject.endDate : startOfDisplayDate;
  let nextTravelObjectStart = (searchResult.nextTravelObject !== null)? searchResult.nextTravelObject.startDate : endOfDisplayDate;
  let freeTimeSlot = {startDate: prevTravelObjectEnd, endDate: nextTravelObjectStart}

  searchResult.freeTimeSlot = freeTimeSlot;
  return searchResult;
};
