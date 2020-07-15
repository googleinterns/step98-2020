import '@testing-library/jest-dom/extend-expect';
import {initialize} from '@googlemaps/jest-mocks'

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

const animationMock = {
  DROP : jest.fn()
}

initialize();
global.window.google.maps.Animation =animationMock;