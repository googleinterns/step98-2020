class PlaceObject {
    constructor(place, prominence) {
        this.place = place;
        this.prominence = prominence;
        this.score = 0;
    }
}

export default function queryPlaces(coordinates, radius, service, types) {
    return new Promise((res, rej) => {
        let queries = types.reduce((queries, type) => {
            queries.push(queryPlacesByType(coordinates, radius, service, type));
            return queries;
        }, [])

        Promise.all(queries).then(results => {
            res(results.reduce((queryResults, nextResults) => {
                let index = 0;
                nextResults.forEach((result) => {
                    var placeObject = new PlaceObject(result, { index: index, total: nextResults.size })
                    index++;
                    queryResults.set(result.place_id, placeObject);
                });
                return queryResults;
            }, new Map()))
        })
            .catch(error => {
                rej(error);
            })
    });
}

function queryPlacesByType(coordinates, radius, service, type) {
    var output = [];
    var pages = { "tourist_attraction": 2, "natural_feature": 2, "bakery": 2, "restaurant": 2, "cafe": 3 };
    var place = new window.google.maps.LatLng(coordinates.lat, coordinates.lng);
    var request = {
        location: place,
        radius: radius,
        types: [type]
    };
    return new Promise((res, rej) => {
        service.nearbySearch(request, function (results, status, pagination) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                output = output.concat(results);
                pages[type] = pages[type] - 1;
                if (pagination.hasNextPage && pages[type] > 0) {
                    pagination.nextPage();
                }
                else {
                    res(new Set(output));
                }

            } else {
                rej("We were unable to find any suggestions given your location and preferences.")
            }
        })
    })

}
