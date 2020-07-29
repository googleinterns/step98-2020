import react from 'react'
import '@testing-library/jest-dom'
import { createSchedule } from '../scripts/Optimization'
import _ from 'lodash'

const userPrefNoFood = { 
  foodTimeRanges : [0, 0, 0],
  startDate : new Date (2020, 7, 27, 8, 0),
  endDate : new Date (2020, 7, 27, 21, 30)
}

const userPrefwithFoodLateRise = { 
  foodTimeRanges : [3600000, 3600000, 3600000],
  startDate : new Date (2020, 7, 27, 8, 0),
  endDate : new Date (2020, 7, 27, 21, 30)
}

const userPrefwithFoodEarlyRise = { 
  foodTimeRanges : [3600000, 3600000, 3600000],
  startDate : new Date (2020, 7, 27, 5, 0),
  endDate : new Date (2020, 7, 27, 21, 30)
}

const displayDate = new Date (2020, 7, 27) 

const toNextLocation = {duration : {value: 900}}

const oneHourTravelObj = {
  startDate : new Date (2020, 7, 27, 0),
  endDate : new Date (2020, 7, 27, 1), 
  toNextLocation : toNextLocation
}

const twoHourTravelObj = {
  startDate : new Date (2020, 7, 27, 0),
  endDate : new Date (2020, 7, 27, 2), 
  toNextLocation : toNextLocation
}

const threeHourTravelObj = {
  startDate : new Date (2020, 7, 27, 0),
  endDate : new Date (2020, 7, 27, 3), 
  toNextLocation : toNextLocation
}

const fourHourTravelObj = {
  startDate : new Date (2020, 7, 27, 0),
  endDate : new Date (2020, 7, 27, 4), 
  toNextLocation : toNextLocation
}

const sixHourTravelObj = {
  startDate : new Date (2020, 7, 27, 0),
  endDate : new Date (2020, 7, 27, 6), 
  toNextLocation : toNextLocation
}

const correctScheduleEarlyRise = [
  {startDate: new Date(2020, 7, 27, 5, 15), endDate: new Date(2020, 7, 27, 6, 15) },
  {startDate: new Date(2020, 7, 27, 7, 30), endDate: new Date(2020, 7, 27, 9, 30)}, 
  {startDate: new Date(2020, 7, 27, 9, 45), endDate: new Date(2020, 7, 27, 12, 45)},
  {startDate: new Date(2020, 7, 27, 14, 0), endDate: new Date(2020, 7, 27, 18, 0)}
]

const correctScheduleLateRise = [
  {startDate: new Date(2020, 7, 27, 9, 15), endDate: new Date(2020, 7, 27, 10, 15)}, 
  {startDate: new Date(2020, 7, 27, 10, 30), endDate: new Date(2020, 7, 27, 12, 30)},
  {startDate: new Date(2020, 7, 27, 13, 45), endDate: new Date(2020, 7, 27, 16, 45)}
]

const correctScheduleEventThroughLunch = [
  {startDate: new Date(2020, 7, 27, 9, 15), endDate: new Date(2020, 7, 27, 10, 15)}, 
  {startDate: new Date(2020, 7, 27, 10, 30), endDate: new Date(2020, 7, 27, 16, 30)},
  {startDate: new Date(2020, 7, 27, 16, 45), endDate: new Date(2020, 7, 27, 17, 45)}
]

const hotel = {toNextLocation : toNextLocation}



test ("early riser, breakfast after first event", () => {
  var travelObjects = [
    _.cloneDeep(hotel), 
    _.cloneDeep(oneHourTravelObj), 
    _.cloneDeep(twoHourTravelObj), 
    _.cloneDeep(threeHourTravelObj), 
    _.cloneDeep(fourHourTravelObj), 
    _.cloneDeep(hotel)]
  var scheduledEvents = createSchedule(travelObjects, userPrefwithFoodEarlyRise);

  expect(scheduledEvents).areEqualRoutes(correctScheduleEarlyRise)

})

test ("later riser, who can fit all events", () => {
  var travelObjects = [hotel, 
    _.cloneDeep(oneHourTravelObj), 
    _.cloneDeep(twoHourTravelObj), 
    _.cloneDeep(threeHourTravelObj), 
    _.cloneDeep(hotel)]
  var scheduledEvents = createSchedule(travelObjects, userPrefwithFoodLateRise);

  expect(scheduledEvents).areEqualRoutes(correctScheduleLateRise)
})

test ("event pushed through lunch - no lunch ", () => {
  var travelObjects = [hotel, 
    _.cloneDeep(oneHourTravelObj), 
    _.cloneDeep(sixHourTravelObj), 
    _.cloneDeep(oneHourTravelObj), 
    _.cloneDeep(hotel)]
  var scheduledEvents = createSchedule(travelObjects, userPrefwithFoodLateRise);

  console.log("schedule", scheduledEvents)
  console.log("correct", correctScheduleEventThroughLunch)

  expect(scheduledEvents).areEqualRoutes(correctScheduleEventThroughLunch)
})

test ("later riser, no longer can fit all events", () => {
  var travelObjects = [hotel, 
    _.cloneDeep(oneHourTravelObj), 
    _.cloneDeep(twoHourTravelObj), 
    _.cloneDeep(threeHourTravelObj), 
    _.cloneDeep(fourHourTravelObj), 
    _.cloneDeep(hotel)]
  try {
    createSchedule(travelObjects, userPrefwithFoodLateRise);
  } catch (error) {
    expect(error === "We couldn't fit " + 1 + " event(s) totaling " + 60 + " minutes into your day.")
  }
})

expect.extend({
  areEqualRoutes(test, expected) {
    if (test.length !== expected.length) {
      return { pass: false, message: () => "schedules not equal" };
    }
    for (let i = 0; i < test.length; i++) {
      if (!areEqualTravelObjects(test[i], expected[i])) {
        return { pass: false, message: () => "schedules not equal" };
      }
    }
    return { pass: true, message: () => "schedules are equal" };
  }
})

const areEqualTravelObjects = function(obj1, obj2) {
  return sameTime(obj1.startDate, obj2.startDate) && sameTime(obj1.endDate, obj2.endDate);
}

const sameTime = function(time1, time2) {
  return time1.getHours() === time2.getHours() && time1.getMinutes() === time2.getMinutes();
}