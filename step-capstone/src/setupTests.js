// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

//Session Storage Mock Setup 
let userId = ""
let tripId = ""

function getItemMock(item){
  if(item === "userId"){
    return userId;
  } else if (item === "tripId") {
    return tripId;
  } 
}

function setItemMock(item, value){
  if(item === "userId"){
    userId = value;
  } else if (item === "tripId") {
    tripId = value;
  } 
}
const sessionStorageMock = {
  getItem: jest.fn(getItemMock),
  setItem: jest.fn(setItemMock),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

//Firebase Mock Setup 

const testTrips = [{
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
}]

const firebaseMock = {
  initializeApp : jest.fn(),
  getTripList : jest.fn(() => {return testTrips})
}

const FirebaseContext = React.createContext(null);
 
export default FirebaseContext;