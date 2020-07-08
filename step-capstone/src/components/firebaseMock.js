import React from 'react';
//Firebase Mock Setup 

const londonTestTripData = {
  description: "A trip to London",
  endDate: new Date (2020, 7, 10),
  location: "London",
  startDate: new Date (2020, 7, 7),
  title : "London Trip",
  travelObjects : {
    arrivalAirport: "LON",
    arrivalDate: new Date(2020, 7, 7, 8),
    departureAirport: "MCO",
    departureDate: new Date (2020, 7, 7, 15),
    description: "flight from Orlando to London",
    finalized: false,
    id: 0,
    type: "flight"
  }
}

const londonTestTrip = {
  data : () => {return londonTestTripData}
}

const testTrips = [londonTestTrip]

class firebaseMock {
  getTripList() {
    return new Promise((resolve) => {
      resolve(testTrips);
    });
  }
  getTrip() {
    return new Promise ((resolve) => {
      resolve(londonTestTrip);
    })
  }
}
export default firebaseMock;