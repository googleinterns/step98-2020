export default function queryPlacesByType (coordinates, radius, service, type) {
    let dict = {"results": [], "natural_feature": 0, "tourist_attraction": 0}
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
                dict[type] = dict[type] + 1;
                console.log("type ", type);
                if (pagination.hasNextPage && dict[type] < 3) {
                    console.log("getting next page")
                    pagination.nextPage();
                }
                else {
                    res(new Set(dict["results"]));
                }
                
            }
            })
        })
        
    
    
}
