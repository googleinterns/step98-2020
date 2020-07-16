import queryPlaces from './PlacesQuery';
import { activityCategories, foodCategories } from './Categories';

const getDateString = (dateObject) => {
    return dateObject.getFullYear() + "-" + dateObject.getMonth() + "-" + dateObject.getDate();
}

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
    let filteredResults = new Map();
    results.forEach((placeObject, place_id) => {
        if (placeObject.hasOwnProperty("opening_hours")) {
            let day = timeRange[0].getDay();

            let openHoursMinutes = placeObject.opening_hour.period[day].open.time;
            let closeHoursMinutes = (placeObject.opening_hour.period[day].close !== undefined) ?
                placeObject.opening_hour.period[day].close.time
                : "2359";


            let date = getDateString(timeRange[0]);
            let openingTime = new Date(date + "T" + openHoursMinutes.slice(0, 2) + ":" + openHoursMinutes.splice(2) + ":00");
            let closingTime = new Date(date + "T" + closeHoursMinutes.slice(0, 2) + ":" + closeHoursMinutes.splice(2) + ":00");

            if (overlaps(openingTime, closingTime, timeRange[0], timeRange[1]) >= 45) {
                filteredResults.set(place_id, placeObject)
            }
        } else {
            filteredResults.set(place_id, placeObject);
        }

    })
    return filteredResults

}

const query = (coordinates, radius, service, timeRange, type) => {
    // return results: a map with key : place_id, value: PlaceObject
    return new Promise(res => {
        let types = type === "food" ? ["bakery", "restaurant", "cafe"] : ["tourist_attraction", "natural_feature"]
        let places = queryPlaces(coordinates, radius, service, types)

        places.then(results => {
            if (types[0] === "tourist_attraction") {
                results = filterByTimeRange(results, timeRange);
            }
            res(results);
        })
    })

}

export const countCat = (placeObject, userCat, type) => {
    // Count the number of categories a place fits into
    let categories = type === "food" ? foodCategories : activityCategories;
    let cats = 0;
    userCat.forEach(catString => {
        for (let i = 0; i < placeObject.place.types.length; i++) {
            if (categories.get(catString).has(placeObject.place.types[i])) {
                cats += 1;
                break;
            }
        }

    })
    return cats;
}

export const getScore = (placeCat, userCat, prominence, placePrice, userBudget, rating) => {
    // return the score for a PlaceObject
    var catScore = 0;
    if (placeCat !== 0) {
        catScore = 60 + 40 / userCat * placeCat;
    }

    var prominenceScore = (((prominence.total - prominence.index) ** 2) / ((prominence.total) ** 2)) * 100;

    var budgetScore = 0;
    if (placePrice === undefined) {
        budgetScore = 50;
    } else if (placePrice > userBudget) {
        budgetScore = 0;
    } else {
        budgetScore = 100;
    }

    rating = (rating === undefined) ? 2.5 : rating;
    var ratingScore = rating * 20;

    return catScore * 0.65 + prominenceScore * 0.1 + budgetScore * 0.1 + ratingScore * 0.15;
}

export const rank = (results, config, type) => {
    // return a list of placeObjects with score calculated
    let placeObjects = []
    results.forEach(placeObject => {
        let placeCat = countCat(placeObject, config.userCat, type);

        let score = getScore(placeCat, config.userCat.length, placeObject.prominence,
            placeObject.place.price_level, config.userBudget, placeObject.place.rating);
        placeObject.score = score;

        placeObjects.push(placeObject);
    })
    placeObjects.sort(placeObjectsComparator);
    return placeObjects;


}
const placeObjectsComparator = (placeObjectA, placeObjectB) => {
    return placeObjectB.score - placeObjectA.score;
}

export async function handleSuggestions(service, config, type) {
    let results = await query(config.coordinates, config.radius, service, config.timeRange, type);
    let placeObjects = rank(results, config, type);
    return placeObjects;

}

