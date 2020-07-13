
const queryGeneralAttractions = (coordinates, radius, service) => {
    var place = new window.google.maps.LatLng(coordinates.lat, coordinates.lng)
    var request = {
        location: place,
        radius: radius,
        types: ['tourist_attraction']
    };

    service.nearbySearch(request, function (results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            return results;
        }
    })
}

const queryNaturalFeatures = (coordinates, radius, service) => {
    var place = new window.google.maps.LatLng(coordinates.lat, coordinates.lng)
    var request = {
        location: place,
        radius: radius,
        types: ['natural_feature']
    };

    service.nearbySearch(request, function (results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            return results;
        }
    })
}

export default { queryGeneralAttractions, queryNaturalFeatures }