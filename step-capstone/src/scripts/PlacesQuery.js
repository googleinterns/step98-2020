export default function queryPlacesByType (coordinates, radius, service, type) {
    var output = [];
    var page = 0;

    var place = new window.google.maps.LatLng(coordinates.lat, coordinates.lng);
    var request = {
        location: place,
        radius: radius,
        types: [type]
    };
    
    return new Promise((res) => {
        var getNextPage = null;
        service.nearbySearch(request, function (results, status, pagination) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                output = output.concat(results);
                page = page + 1;
                console.log("type ", type);
                if (pagination.hasNextPage && page < 3) {
                    console.log("getting next page")
                    pagination.nextPage();
                }
                else {
                    res(new Set(output));
                }
                
            }
            })
        })
        
    
    
}
