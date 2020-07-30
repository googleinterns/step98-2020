
/*
 * getDistance(origin: Coordinate, destination: Coordinate, travelMode: String) => 
 * {distance: {text: String, value: Number (meters)}, duration: {text: String, value: Number (seconds)}, status: String}
 * 
 * Transit options are BICYCLING, DRIVING, TRANSIT, WALKING
 */
export default function getDistance(origin, destination, travelMode) {
    let service = new window.google.maps.DistanceMatrixService;
    let request = {
        origins: [new window.google.maps.LatLng(origin.lat, origin.lng)],
        destinations: [new window.google.maps.LatLng(destination.lat, destination.lng)],
        travelMode: travelMode,
    }
    return new Promise(res => {
        service.getDistanceMatrix(request, (response, status) => {
            if (status === "OK") {
                res(response.rows[0].elements[0])
            }
        })
    })
}