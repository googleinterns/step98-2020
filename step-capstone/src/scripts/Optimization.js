export const getOptimalRoute = function (travelObjects, start, end) {
    let request = {
        origin: new window.google.maps.LatLng(start.coordinates.lat, start.coordinates.lng),
        destination: new window.google.maps.LatLng(end.coordinates.lat, end.coordinates.lng),
        waypoints: travelObjects.map(travelObject => {
            return { location: new window.google.maps.LatLng(travelObject.coordinates.lat, travelObject.coordinates.lng), stopover: true }
        }),
        travelMode: "DRIVING",
        optimizeWaypoints: true
    }
    var directionsService = new window.google.maps.DirectionsService();

    return new Promise(res => {
        directionsService.route(request, function(result, status) {
            if (status === "OK") {
                let order = result.routes[0].waypoint_order;
                var travelObjectsInOrder = order.map(index => travelObjects[index]);
                travelObjectsInOrder = [start].concat(travelObjectsInOrder);
                travelObjectsInOrder = travelObjectsInOrder.concat([end]);
                for (let i = 0; i < result.routes[0].legs.length; i++) {
                    travelObjectsInOrder[i].toNextLocation = result.routes[0].legs[i];
                }
                res(travelObjectsInOrder);
            }
        })
    })
}

//output = list of modified travel objects --> changing times and mark as finalized
//breakfast: 6am-10am
//lunch: 11am-3pm
//dinner: 5pm-9pm
export const createSchedule = function (travelObjects, userPref, displayDate) {

    var curTime = new Date(displayDate);
    curTime.setTime(userPref.startTime.getTime() + travelObjects[0].toNextLocation.duration.value * 1000)

    const foodTimeRanges = [[6, 10], [11, 15], [17, 21]]
    var nextFoodRange = 0;

    var editedTravelObjects = [];
    for (let i = 1; i < travelObjects.length - 1; i++) {
        console.log("Curtime hours: ", curTime.getHours());
        console.log(foodTimeRanges[nextFoodRange][0]);
        if (nextFoodRange < 3 && curTime.getHours() >= foodTimeRanges[nextFoodRange][0] && curTime.getHours() <= foodTimeRanges[nextFoodRange][1]) {
            curTime.setTime(curTime.getTime() + userPref.foodTimeRanges[nextFoodRange]);
            nextFoodRange++;
        } else if (curTime.getHours() > foodTimeRanges[nextFoodRange][1]) {
            nextFoodRange++;
        }
        var curTravelObject = travelObjects[i];
        var diff = curTravelObject.endDate.getTime() - curTravelObject.startDate.getTime();
        curTravelObject.startDate = new Date(curTime);
        curTime.setTime(curTime.getTime() + diff);
        curTravelObject.endDate = new Date(curTime);
        editedTravelObjects.push(curTravelObject);
        curTime.setTime(curTime.getTime() + curTravelObject.toNextLocation.duration.value * 1000);
    }
    return editedTravelObjects;
}

