class PlaceObject {
    constructor(place, prominence) {
        this.place = place;
        this.prominence = prominence;
        this.score = 0;
    }
}

export default function queryPlaces (coordinates, radius, service, types) {
    return new Promise(res => {
        let queries = types.reduce((queries, type) => {
            queries.push(queryPlacesByType(coordinates, radius, service, type));
            return queries;
        }, [])
        
        Promise.all(queries).then(results => {
            res(results.reduce((queryResults, nextResults) => {
                for(var index = 0; index < nextResults.length; index++) {
                    var result = nextResults[index];
                    var placeObject = new PlaceObject(result, {index: index, total: results.length})
                    queryResults.set(result.place_id, placeObject);  
                }
                return queryResults;
            }, new Map()))
        })
    });
}

function queryPlacesByType (coordinates, radius, service, type) {
    var output = [];

    var place = new window.google.maps.LatLng(coordinates.lat, coordinates.lng);
    var request = {
        location: place,
        radius: radius,
        types: [type]
    };
    
    return new Promise((res) => {
        service.nearbySearch(request, function (results, status, pagination) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                output = output.concat(results);
                if (pagination.hasNextPage) {
                    pagination.nextPage();
                }
                else {
                    res(new Set(output));
                }
                
            }
            })
        })
        
}
