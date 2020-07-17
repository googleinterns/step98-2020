import queryPlaces from './PlacesQuery';
import categories from './Categories';

const getDisplayDateString = (displayDate) => {
    let year = displayDate.getFullYear().toString();
    let month = (displayDate.getMonth() <10)? "0" + displayDate.getMonth() : displayDate.getMonth();
    let date = (displayDate.getDate() < 10)? "0" + displayDate.getDate()   : displayDate.getDate();;
    return year + "-" + month + "-" + date;
  };

const contains = (startTime, endTime, timePoint) => {
    // return whether timeRange from startTime to endTime contains timePoint
    return startTime < timePoint && timePoint < endTime;
}

const overlaps = (openingTime, closingTime, startTime, endTime) => {
    /**
     * Case 1: 
     * opening-closing: |----------|
     * start-end      :     |----------|
     * 
     * Case 2:
     * opening-closing:         |----------|
     * start-end      :     |----------| 
     * 
     * Case 3:
     * opening-closing:         |----------|
     * start-end      :            |------| 
     * 
     * Case 4:
     * opening-closing:         |----|
     * start-end      :     |----------| 
     * 
     */
    if (contains(openingTime, closingTime, startTime) && !contains(openingTime, closingTime, endTime)) {
        return millisToMinutes(closingTime - startTime);
    }
    else if (contains(startTime, endTime, openingTime) && !contains(startTime, endTime, closingTime)) {
        return millisToMinutes(endTime - openingTime);
    }
    else if (contains(openingTime, closingTime, startTime) && contains(openingTime, closingTime, endTime)) {
        return millisToMinutes(endTime - startTime);
    }
    else if (contains(startTime, endTime, openingTime) && !contains(startTime, endTime, closingTime)) {
        return millisToMinutes(closingTime - openingTime);
    } 
    else {
        return 0;
    }
}

const millisToMinutes = (millis) => {
  var minutes = Math.floor(millis / 60000);
  return minutes;
}

const filterByTimeRange = (results, timeRange) => {
    results.filter((result) => {
        if (result.hasOwnProperty("opening_hours")) {
            let day = timeRange[0].getDay();
            
            let openHoursMinutes = result.opening_hour.period[day].open.time;
            let closeHoursMinutes = (result.opening_hour.period[day].close !== undefined)? 
                                    result.opening_hour.period[day].close.time
                                    : "2359";
            

            let date = getDateString(timeRange[0]);
            let openingTime = new Date(date + "T" + openHoursMinutes.slice(0, 2) + ":" + openHoursMinutes.splice(2) +":00");
            let closingTime = new Date(date + "T" + closeHoursMinutes.slice(0, 2) + ":" + closeHoursMinutes.splice(2) + ":00");
            
            return overlaps(openingTime, closingTime, timeRange[0], timeRange[1]) >= 45;
        } 
        return true;
    })
}

const query = (coordinates, service) => {
    // return results: a map with key : place_id, value: PlaceObject
    let places = queryPlaces(coordinates, radius, service, ["tourist_attraction", "natural_feature"])
    places.then(results => {
        return results;
    })
}

const countCat = (placeObject, userCat) => {
    // Count the number of categories a place fits into
    let cats = 0;
    userCat.forEach(catString => {
        placeObject.place.types.forEach(type => {
            if (categories.get(catString).has(type)) {
                cats += 1;
                break;
            }
        })
    
    })
    return cats;
}

const getScore = (placeCat, userCat, prominence, placePrice, userBudget, rating) => {
    // return the score for a PlaceObject
    var catScore = 0;
    if (cat !== 0) {
        catScore = 60 + 40/userCat * placeCat;
    }

    var prominenceScore = (prominence.total - prominence.index)**2/(prominence.total)**2 * 100;
    
    var budgetScore = 0;
    if (placePrice === null) {
        budgetScore = 50;
    } else if (userBudget < placePrice) {
        budgetScore = 0;
    } else {
        budgetScore = 100;
    }

    var ratingScore = rating* 20;

    return catScore * 0.65 + prominenceScore * 0.15 + budgetScore * 0.1 + ratingScore * 0.1;
}

const rank = (results, config) => {
    // return a list of placeObjects with score calculated
    let placeObjects = []
    results.forEach(placeObject => {
        let placeCat = countCat(placeObject, config.userCat);
        
        let score = getScore(placeCat, config.userCat.length, placeObject.prominence, 
            placeObject.place.price_level, config.userBudget, placeObject.place.rating);
        placeObject.score = score;

        placeObjects.push(placeObject);
    })
    
    return placeObjects;
    

}
const placeObjectsComparator = (placeObjectA, placeObjectB) => {
    return placeObjectA.score - placeObjectB.score;
}

export default function handleSuggestions(service, config) {
    let results = query(config.coordinates, config.radius, service);
    let placeObjects = rank(results, config);
    placeObjects.sort(placeObjectsComparator);
    return placeObjects;

}