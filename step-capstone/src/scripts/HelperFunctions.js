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