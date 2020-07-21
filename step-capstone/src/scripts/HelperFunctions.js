export const travelObjectStartDateComparator = (travelObjectA, travelObjectB) => {
    if (travelObjectA.startDate === travelObjectB.startDate) {
      return 0;
    }
    else if (travelObjectA.startDate > travelObjectB.startDate) {
      return 1;
    }
    else {
      return -1;
    }
}

export const isValid = function (date) {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  return date.getTime() === date.getTime();
};