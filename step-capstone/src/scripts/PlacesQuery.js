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
let dict = {"results": []}

const queryPlacesByType = (coordinates, radius, service, type) => {
    var place = new window.google.maps.LatLng(coordinates.lat, coordinates.lng)
    var request = {
        location: place,
        radius: radius,
        types: [type]
    };
    return new Promise((res) => {
        var getNextPage = null;
        service.nearbySearch(request, function (results, status, pagination) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                dict["results"] = dict["results"].concat(results);
                console.log("type ", type);
                if (pagination.hasNextPage && dict["results"].length < 60) {
                    console.log("getting next page")
                    pagination.nextPage();
                }
                else {
                    res(dict["results"]);
                }
                
            }
            })
        })
        
    
    
}
