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
    curTime.setTime(userPref.startDate.getTime() + travelObjects[0].toNextLocation.duration.value * 1000)

    const foodTimeRanges = [[6, 10], [11, 15], [17, 21]]
    var nextFoodRange = 0;

    var editedTravelObjects = [];
    for (let i = 1; i < travelObjects.length - 1; i++) {
        if (nextFoodRange < 3 && curTime.getHours() >= foodTimeRanges[nextFoodRange][0] && curTime.getHours() <= foodTimeRanges[nextFoodRange][1]) {
            curTime.setTime(curTime.getTime() + userPref.foodTimeRanges[nextFoodRange]);
            nextFoodRange++;
        } else if (curTime.getHours() > foodTimeRanges[nextFoodRange][1]) {
            nextFoodRange++;
        }
        var curTravelObject = travelObjects[i];
        console.log(curTravelObject)
        var diff = curTravelObject.endDate.getTime() - curTravelObject.startDate.getTime();
        let newStart = new Date(curTime);
        let newEnd = new Date(curTime.getTime() + diff);
        curTime.setTime(newEnd.getTime() + curTravelObject.toNextLocation.duration.value * 1000);

        if (curTime.getTime() > userPref.endDate.getTime()) {
            console.log("Day's end: ", userPref.endDate);
            console.log("Curtime: ", curTime);
            let numLeft = travelObjects.length - i - 1;
            var timeLeft = curTime.getTime() - userPref.endDate.getTime() + curTravelObject.toNextLocation.duration.value * 1000;
            curTravelObject = travelObjects[++i];
            while (i < travelObjects.length - 1) {
                timeLeft += curTravelObject.endDate.getTime() - curTravelObject.startDate.getTime() + curTravelObject.toNextLocation.duration.value * 1000;
                curTravelObject = travelObjects[++i];
            }
            console.log(editedTravelObjects)
            throw "We couldn't fit " + numLeft + " number of events totaling " + Math.floor(timeLeft / 60000) + " minutes into your day."
        }

        curTravelObject.startDate = new Date(newStart);
        curTravelObject.endDate = new Date(newEnd);
        curTravelObject.finalized = true;
        delete curTravelObject.toNextLocation;
        editedTravelObjects.push(curTravelObject);
    }

    return editedTravelObjects;
}

