/* Handling click into empty slot starts HERE */
// Receives displayDate, returns the date string of displayDate
const getDisplayDateString = (displayDate) => {
  let year = displayDate.getFullYear().toString();
  let month = (displayDate.getMonth() + 1 <10)? "0" + (displayDate.getMonth() + 1).toString() : displayDate.getMonth();
  let date = (displayDate.getDate() < 10)? "0" + displayDate.getDate()   : displayDate.getDate();;
  return year + "-" + month + "-" + date +   "T";
};

// Receives displayItems list, returns a list of empty intervals
export const getEmptySlots = (displayItems, displayDate) => {
  let emptySlots = [];
  const displayDateString = getDisplayDateString(displayDate);
  if (displayItems.length == 0) {
    emptySlots.push({ 
        startDate: new Date(displayDateString + "00:00:00"),
        endDate: new Date(displayDateString + "23:59:59"),
    });
    return emptySlots;
  } else {
    emptySlots.push({
      startDate: new Date(displayDateString + "00:00:00"),
      endDate: displayItems[0].startDate,
    });
  }

  for (var i = 1; i <= displayItems.length - 1; i++) {
    let prev = displayItems[i - 1];
    let cur = displayItems[i];

    emptySlots.push({startDate: prev.endDate, endDate: cur.startDate});
  }

  emptySlots.push({
    startDate: displayItems[displayItems.length - 1].endDate,
    endDate: new Date(displayDateString + "23:59:59"),
  });
  return emptySlots;
};

//Receives a list of intervals and returns the interval that the timePoint is in, returns null if there is none.
const binarySearch = (intervals, timePoint) => {
  if (intervals.length == 0) {
    return null;
  }
  let low = 0;
  let high = intervals.length - 1;

  while (low <= high) {
    let centerIndex = Math.floor((low + high) / 2);
    let centerInterval = intervals[centerIndex];
    if (
      centerInterval.startDate <= timePoint &&
      timePoint <= centerInterval.endDate
    ) {
      return centerInterval;
    } else if (timePoint < centerInterval.startDate) {
      high = centerIndex - 1;
    } else {
      low = centerIndex + 1;
    }
  }

  return null;
};

/*Return the empty timeRange that users click into by performing binary search on emptySlots array*/
export const handleClickedTimePoint = (idV, displayDate, emptySlots, displayItems) => {
  let clickedTime = new Date(getDisplayDateString(displayDate) + idV + ":00");
  let curSlot = binarySearch(emptySlots, clickedTime);
  let prevSlot = binarySearch(displayItems, curSlot.startDate);
  let nextSlot = binarySearch(displayItems, curSlot.endDate);
  
  return {curSlot: curSlot, prevSlot: prevSlot, nextSlot: nextSlot};
};
