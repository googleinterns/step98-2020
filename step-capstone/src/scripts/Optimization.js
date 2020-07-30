import moment from "moment"

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
  var curTime = moment(displayDate);

  curTime.add(userPref.dayStartEndTimes[0].getHours(), "h");
  curTime.add(userPref.dayStartEndTimes[0].getMinutes(), "m");
  curTime.add(travelObjects[0].toNextLocation.duration.value, "s");

  const foodTimeRanges = [BREAKFAST_TIMERANGE, LUNCH_TIMERANGE, DINNER_TIMERANGE]
  var nextFoodRange = 0;

  var editedTravelObjects = [];
  for (let i = 1; i < travelObjects.length - 1; i++) {
    // looks for first empty timeslot within eating times and leaves room in schedule
    if (nextFoodRange < 3 && curTime.hours() >= foodTimeRanges[nextFoodRange][0] && curTime.hours() <= foodTimeRanges[nextFoodRange][1]) {
      curTime.add(userPref.foodTimeRanges[nextFoodRange], "ms")
      nextFoodRange++;
    } else if (nextFoodRange < 3 && curTime.hours() > foodTimeRanges[nextFoodRange][1]) {
      nextFoodRange++;
    }

    // calculate new start/end times for current travel object based on provided duration and travel durations.
    var curTravelObject = travelObjects[i];
    var diff = curTravelObject.endDate.getTime() - curTravelObject.startDate.getTime();
    let newStart = moment(curTime);
    let newEnd = moment(curTime);
    newEnd.add(diff, "ms");
    curTime = moment(newEnd);
    curTime.add(curTravelObject.toNextLocation.duration.value, "s")

    let dayEnd = moment(curTime);
    dayEnd.hours(userPref.dayStartEndTimes[1].getHours());
    dayEnd.minutes(userPref.dayStartEndTimes[1].getMinutes());
    // overflowing objects
    if (curTime.isAfter(dayEnd)) {
      let numLeft = travelObjects.length - i - 1;
      let timeLeft = curTime.diff(dayEnd);
      timeLeft += curTravelObject.toNextLocation.duration.value * 1000;

      if (i < travelObjects.length - 1 ){
        curTravelObject = travelObjects[++i];
        while (i < travelObjects.length - 1) {
          timeLeft += moment.duration(curTravelObject.endDate.getHours(), "hour").asMilliseconds();
          timeLeft += moment.duration(curTravelObject.endDate.getMinutes(), "minutes").asMilliseconds();
          timeLeft -= moment.duration(curTravelObject.startDate.getHours(), "hours").asMilliseconds();
          timeLeft -= moment.duration(curTravelObject.startDate.getMinutes(), "minutes").asMilliseconds();
          timeLeft += curTravelObject.toNextLocation.duration.value * 1000;

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

