import { min } from "date-fns";

export default function queryPlaces (coordinates, radius, service, types) {
    return new Promise(res => {
        let queries = types.reduce((queries, type) => {
            queries.push(queryPlacesByType(coordinates, radius, service, type))
            return queries
        }, [])

        Promise.all(queries).then(result => {
            res(result.reduce((allPlaces, queryResult) => {
                return allPlaces.concat(queryResult)
            }, []))
        })
    });
}

const queryPlacesByType = (coordinates, radius, service, type) => {
    var place = new window.google.maps.LatLng(coordinates.lat, coordinates.lng)
    var request = {
        location: place,
        radius: radius,
        types: [type]
    };

    var getNextPage = null;
    var results = new Promise(res => {
        service.nearbySearch(request, function (results, status, pagination) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                getNextPage = null;
                getNextPage = pagination.hasNextPage && function () {
                    console.log("getting next page")
                    pagination.nextPage()
                }
                res(results);
            }
        })
    })
    
    // console.log(results);
    // while (getNextPage !== null) {
    //     console.log("in while loop")
    //     results = results.concat(getNextPage());
    // }

    return results;
}
