const APIKEY = process.env.REACT_APP_IP_RESTRICTED

const getTimezoneFromCoordinates = (lat, lng) => {
    return new Promise(resolve => {
        fetch("https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp=1458000000&key="+APIKEY)
            .then(result => result.json())
            .then(data => {
                resolve(data.timeZoneName);
            });
    });

}

/* Gets placeID and returns string representation of address and coordinates */
const getLocation = (placeID) => {
    return new Promise(resolve => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?place_id="+placeID+"&key=" + APIKEY)
            .then(result => result.json())
            .then(data => {
                resolve({address: data.results[0].formatted_address, coordinates: data.results[0].geometry.location});
            });
    });
}


export default { getTimezoneFromCoordinates, getLocation}

