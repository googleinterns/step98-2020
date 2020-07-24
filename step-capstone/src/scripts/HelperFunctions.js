
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

//returns true if there is a conflict, false otherwise
export const hasTimeConflict = (id, startDate, endDate, travelObjects) => {
  var foundConflict = false;
  travelObjects.forEach((travelObject) => {
    console.log("editing id", id)
    console.log("travelobj", travelObject.id)
    if(travelObject.finalized && id!==travelObject.id){
      if (overlaps(travelObject.startDate, travelObject.endDate, startDate, endDate)) {
        foundConflict = true;
      }
    }
  });
  return foundConflict;
}

export const overlaps = (startTimeA, endTimeA, startTimeB, endTimeB) => {
  if ((startTimeA < endTimeB) && (endTimeA > startTimeB)) {
    return true;
  } else {
    return false;
  }
}