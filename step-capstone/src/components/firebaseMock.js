import React from 'react';
import firebase from 'firebase/app'
//Firebase Mock Setup 

const londonTestTripData = {
  description: "A trip to London",
  endDate: firebase.firestore.Timestamp.fromDate(new Date (2020, 7, 10)),
  location: "London",
  startDate: firebase.firestore.Timestamp.fromDate(new Date (2020, 7, 7)),
  title : "London Trip",
  travelObjects : [ {
    arrivalAirport: "LON",
    startDate: firebase.firestore.Timestamp.fromDate(new Date(2020, 7, 7, 8)) ,
    departureAirport: "MCO",
    endDate: firebase.firestore.Timestamp.fromDate(new Date(2020, 7, 7, 15)),
    description: "flight from Orlando to London",
    finalized: false,
    id: 0,
    type: "flight"
  }]
}

const londonTestTrip = {
  data : () => {return londonTestTripData},
  id : 0
}

export const testTrips = [londonTestTrip]

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