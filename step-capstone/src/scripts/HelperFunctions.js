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

/*Given 2 Date objects, return true if they have the same date; return false otherwise */
export const sameDate = (timeA, timeB) => {
  return (timeA.getDate() === timeB.getDate() && timeA.getMonth() === timeB.getMonth() && timeA.getFullYear() === timeB.getFullYear());
}

export const isValid = function (date) {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  return date.getTime() === date.getTime();
};

export const fetchPhoto = function (placeId, service) {
  let request = {
    placeId: placeId,
    fields: ["photos"]
  }
  return new Promise((res) => {
    service.getDetails(
      request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          let url = results.photos[0].getUrl();
          res(url);
        }
      }
    )
  })
}

export const sameTravelObjectList = function (list1, list2) {
  if (list1.length !== list2.length) {
    return false;
  }

  let sortedList1 = sortTravelObjectsByDate(list1);
  let sortedList2 = sortTravelObjectsByDate(list2);

  for (let i = 0; i < list1.length; i++) {
    if (sortedList1[i].id !== sortedList2[i].id) {
      console.log("list1: ", list1[i]);
      console.log("list2: ", list2[i]);
      return false;
    }
  }
  return true;
}

export const sortTravelObjectsByDate = function (list) {
  return list.sort(travelObjectStartDateComparator)
}

