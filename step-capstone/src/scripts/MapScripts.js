const APIKEY = process.env.REACT_APP_IP_RESTRICTED

const getTimezoneFromCoordinates = (lat, lng) => {
    return new Promise(resolve => {
        fetch("https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=1458000000&key=" + APIKEY)
            .then(result => result.json())
            .then(data => {
                resolve(data.timeZoneName);
            });
    });

}


export default { getTimezoneFromCoordinates }

