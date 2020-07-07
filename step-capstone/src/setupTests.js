// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';


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

