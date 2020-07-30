const BREAKFAST_TIMERANGE = [6, 10];
const LUNCH_TIMERANGE = [11, 15];
const DINNER_TIMERANGE = [17, 21];

export const getOptimalRoute = function (travelObjects, origin, destination) {
  
  let request = {
    origin: new window.google.maps.LatLng(origin.coordinates.lat, origin.coordinates.lng),
    destination: new window.google.maps.LatLng(destination.coordinates.lat, destination.coordinates.lng),
    waypoints: travelObjects.map(travelObject => {
      return { location: new window.google.maps.LatLng(travelObject.coordinates.lat, travelObject.coordinates.lng), stopover: true }
    }),
    travelMode: "DRIVING",
    optimizeWaypoints: true
  }
  var directionsService = new window.google.maps.DirectionsService();

  return new Promise((res, rej) => {
    directionsService.route(request, function (result, status) {
      if (status === "OK") {
        let order = result.routes[0].waypoint_order; // array of indexes in optimized order
        var travelObjectsInOrder = order.map(index => travelObjects[index]); // create new array with travel objects in order

        travelObjectsInOrder = [origin].concat(travelObjectsInOrder);
        travelObjectsInOrder = travelObjectsInOrder.concat([destination]);

        for (let i = 0; i < result.routes[0].legs.length; i++) {
          travelObjectsInOrder[i].toNextLocation = result.routes[0].legs[i];
        }

        res(travelObjectsInOrder);
      } else {
        rej("Status not ok");
      }
    })
  })
}

export const createSchedule = function (travelObjects, userPref, displayDate) {
  var curTime = new Date(displayDate);
  curTime.setTime(userPref.dayStartEndTimes[0].getTime() + travelObjects[0].toNextLocation.duration.value * 1000)

  const foodTimeRanges = [BREAKFAST_TIMERANGE, LUNCH_TIMERANGE, DINNER_TIMERANGE]
  var nextFoodRange = 0;

  var editedTravelObjects = [];
  for (let i = 1; i < travelObjects.length - 1; i++) {
    // looks for first empty timeslot within eating times and leaves room in schedule
    if (nextFoodRange < 3 && curTime.getHours() >= foodTimeRanges[nextFoodRange][0] && curTime.getHours() <= foodTimeRanges[nextFoodRange][1]) {
      curTime.setTime(curTime.getTime() + userPref.foodTimeRanges[nextFoodRange]);
      nextFoodRange++;
    } else if (nextFoodRange < 3 && curTime.getHours() > foodTimeRanges[nextFoodRange][1]) {
      nextFoodRange++;
    }

    // calculate new start/end times for current travel object based on provided duration and travel durations.
    var curTravelObject = travelObjects[i];
    var diff = curTravelObject.endDate.getTime() - curTravelObject.startDate.getTime();
    let newStart = new Date(curTime);
    let newEnd = new Date(curTime.getTime() + diff);
    curTime.setTime(newEnd.getTime() + curTravelObject.toNextLocation.duration.value * 1000);

    // overflowing objects
    if (curTime.getTime() > userPref.dayStartEndTimes[1].getTime()) {
      let numLeft = travelObjects.length - i - 1;
      var timeLeft = curTime.getTime() - userPref.dayStartEndTimes[1].getTime() + curTravelObject.toNextLocation.duration.value * 1000;
      if (i < travelObjects.length - 1 ){
        curTravelObject = travelObjects[++i];
        while (i < travelObjects.length - 1) {
          timeLeft += curTravelObject.endDate.getTime() - curTravelObject.startDate.getTime() + curTravelObject.toNextLocation.duration.value * 1000;
          curTravelObject = travelObjects[++i];
        }
      }
      throw "We couldn't fit " + numLeft + " event(s) totaling " + Math.floor(timeLeft / 60000) + " minutes into your day."
    }

    // sets start/end times in travel object
    curTravelObject.startDate = new Date(newStart);
    curTravelObject.endDate = new Date(newEnd);
    curTravelObject.finalized = true;

    // remove toNextLocation attribute 
    delete curTravelObject.toNextLocation;

    editedTravelObjects.push(curTravelObject);
  }

  return editedTravelObjects;
}

