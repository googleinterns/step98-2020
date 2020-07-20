import '@testing-library/jest-dom'
import {countCat} from '../scripts/Suggestion'

/*
 * countCat testing
*/
//one item matches preferences
test("Place with a type matching a single user preference", () => {
  const userCat = ["familyFriendly", "outdoors"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "aquarium"] 
    }
  } 
  expect(countCat(place, userCat)).toEqual(1)
})

test("Place with a type matching mutliple user preferences", () => {
  const userCat = ["familyFriendly", "outdoors"]
  const place = { 
    place_id: 1, 
    place: {
      types: ["tourist_attraction", "zoo"] 
    }
  } 
  expect(countCat(place, userCat)).toEqual(2);
})

test("Zero matches with user preferences", () => {
  const userCat = ["nightlife"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "aquarium"] 
    }
  } 
  expect(countCat(place, userCat)).toEqual(0);
})

test("Doesn’t double count category matches", () => {
  const userCat = ["sightseeing"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "city_hall"] 
    }
  } 
  
  // tourist_attraction → sightseeing
  // city_hall → sightseeing
  expect(countCat(place, userCat)).toEqual(1);
})

test("Multiple types, multiple matches for each", () => {
  const userCat = ["sightseeing", "outdoors", "historicalSites", "artsAndCulture"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "natural_feature", "church"] 
    }
  } 
  // tourist_attraction → sightseeing, historicalSites
  // natural_feature → outdoors
  // church → sightseeing, historicalSites, artsAndCulture
  expect(countCat(place, userCat)).toEqual(4)
})
