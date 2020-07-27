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
    if (!equalsTravelObject(sortedList1[i], sortedList2[i])) {
      return false;
    }
  }
  return true;
}

export const sortTravelObjectsByDate = function (list) {
  return list.sort(travelObjectStartDateComparator)
}

const equalsTravelObject = function (obj1, obj2) {
  if (obj1.id !== obj2.id ||
    !sameDate(obj1.startDate, obj2.startDate) ||
    !sameDate(obj1.endDate, obj2.endDate) ||
    obj1.finalized !== obj2.finalized ||
    obj1.description !== obj2.description) {

    return false;
  }
  if (obj1.type === "flight") {
    if (obj1.departurePlaceId !== obj2.departurePlaceId || obj1.arrivalPlaceId !== obj2.arrivalPlaceId) {
      return false;
    } 
  } else {
    if (obj1.title !== obj2.title || obj1.placeId !== obj2.placeId) {
      return false;
    }
  }
  return true;
}

export const AutoCapitalize = function(string) {
  let words = string.split(" ");
  return words.reduce((title, word) => {
    title += word.charAt(0).toUpperCase() + word.substring(1) + " ";
    return title;
  }, "")
}

