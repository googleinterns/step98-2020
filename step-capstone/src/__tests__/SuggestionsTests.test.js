import react from 'react'
import '@testing-library/jest-dom'
import {countCat, getScore, rank} from '../scripts/Suggestions'
import {suggestionTestData} from "../testData/SuggestionTestData"

/*
 * countCat testing
*/
//one item matches preferences
test("Counts type with one preference match correctly", () => {
  const userCategories = ["familyFriendly", "outdoors"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "aquarium"] 
    }
  } 
  expect(countCat(place, userCategories)).toEqual(1)
})

test("Counts type with multiple preference matches correctly", () => {
  const userCategories = ["familyFriendly", "outdoors"]
  const place = { 
    place_id: 1, 
    place: {
      types: ["tourist_attraction", "zoo"] 
    }
  } 
  expect(countCat(place, userCategories)).toEqual(2);
})

test("Zero matches with user preferences", () => {
  const userCategories = ["nightlife"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "aquarium"] 
    }
  } 
  expect(countCat(place, userCategories)).toEqual(0);
})

test("Doesn’t double count category matches", () => {
  const userCategories = ["sightseeing"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "city_hall"] 
    }
  } 
  
  // tourist_attraction → sightseeing
  // city_hall → sightseeing
  expect(countCat(place, userCategories)).toEqual(1);
})

test("Multiple types, multiple matches for each", () => {
  const userCategories = ["sightseeing", "outdoors", "historicalSites", "artsAndCulture"]
  const place = { 
    place_id: 0, 
    place: {
      types: ["tourist_attraction", "natural_feature", "church"] 
    }
  } 
  // tourist_attraction → sightseeing, historicalSites
  // natural_feature → outdoors
  // church → sightseeing, historicalSites, artsAndCulture
  expect(countCat(place, userCategories)).toEqual(4)
})

/*
 * Score testing
 */

const ZERO_PROMINENCE = { total: 1, index: 1 }

test("Handles category score correctly", () => {
  let score = getScore(2, 4, ZERO_PROMINENCE, 5, 1, 0);
  expect(score).toEqual(52);
})

test("Matches all scores", () => {
  let score = getScore(2, 2, ZERO_PROMINENCE, 5, 1, 0);
  expect(score).toEqual(65);
})

test("Matches zero scores", () => {
  let score = getScore(0, 2, ZERO_PROMINENCE, 5, 1, 0);
  expect(score).toEqual(0);
})

test("Handles prominence correctly", () => {
  let score = getScore(1, 1, { index: 5, total: 10 }, 5, 1, 0);
  expect(score - 65).toEqual(3.75)
})

test("Handles #1 prominence correctly", () => {
  let score = getScore(1, 1, { index: 0, total: 10 }, 5, 1, 0);
  expect(score - 65).toEqual(15);
})

test("Handles rating correctly", () => {
  let score = getScore(1, 1, ZERO_PROMINENCE, 5, 1, 3.5);
  expect(score - 65).toEqual(7);
})

test("Handles 0 rating correctly", () => {
  let score = getScore(1, 1, ZERO_PROMINENCE, 5, 1, 0);
  expect(score - 65).toEqual(0);
})

test("Handles 5 rating correctly", () => {
  let score = getScore(1, 1, ZERO_PROMINENCE, 5, 1, 5);
  expect(score - 65).toEqual(10);
})

test("Handles no rating", () => {
  let score = getScore(1, 1, ZERO_PROMINENCE, 5, 1, undefined);
  expect(score - 65).toEqual(5);
})

test("Handles valid Budget correctly", () => {
  let score = getScore(1, 1, ZERO_PROMINENCE, 1, 3, 0);
  expect(score - 65).toEqual(10);
})

test("Handles null Budget correctly", () => {
  let score = getScore(1, 1, ZERO_PROMINENCE, undefined, 3, 0);
  expect(score - 65).toEqual(5);
})

// test("Too expensive", () => {
//   let score = getScore()
//   expect(score - 65).toEqual(0);
// })

test("Correctly calculates overall score", () => {
  let score = getScore(3, 4, { index: 60, total: 120}, 2, 3, 4.4);
  expect(score).toEqual(81.05);
})

/*
 * Overall Ranking Testing
*/
// FamilyEnt with MIdBudget Test
test("FamilyEnt with MidBudget", () => {
  const config = suggestionTestData.prefMidBudgetFamilyEnt
  const testPlaces = new Map();

  testPlaces.set(suggestionTestData.aquarium.place.place_id, suggestionTestData.aquarium)
  testPlaces.set(suggestionTestData.expensiveMuseum.place.place_id, suggestionTestData.expensiveMuseum)
  testPlaces.set(suggestionTestData.mountain.place.place_id, suggestionTestData.mountain)

  const rankedResults = rank(testPlaces, config)
  const expectedRankedResults = [suggestionTestData.aquarium, suggestionTestData.mountain, suggestionTestData.expensiveMuseum]

 

  expect(rankedResults).areEqualSuggestions(expectedRankedResults)
})

// check that prominent item ranks higher
test("prominent item ranking higher", () => {
  const config = suggestionTestData.prefMidBudgetFamilyEnt
  const testPlaces = new Map();
  testPlaces.set(suggestionTestData.aquarium.place.place_id, suggestionTestData.aquarium)
  testPlaces.set(suggestionTestData.prominentAquarium.place.place_id, suggestionTestData.prominentAquarium)

  const rankedResults = rank(testPlaces, config)
  const expectedRankedResults = [suggestionTestData.prominentAquarium, suggestionTestData.aquarium]

  

  expect(rankedResults).areEqualSuggestions(expectedRankedResults)
})

// check that Budget friendly item ranks higher
test("Budget friendly item ranking higher", () => {
  const config = suggestionTestData.prefMidBudgetFamilyEnt
  const testPlaces = new Map();
  testPlaces.set(suggestionTestData.museum.place.place_id, suggestionTestData.museum)
  testPlaces.set(suggestionTestData.expensiveMuseum.place.place_id, suggestionTestData.expensiveMuseum)

  const rankedResults = rank(testPlaces, config)
  const expectedRankedResults = [suggestionTestData.museum, suggestionTestData.expensiveMuseum]

  expect(rankedResults).areEqualSuggestions(expectedRankedResults)
})

//check that higher Budget ignores Budget friendly
test("higher Budget favors slightly better but more expensive", () => {
  const config = suggestionTestData.prefHighBudgetFamilyEnt
  const testPlaces = new Map();
  testPlaces.set(suggestionTestData.museum.place.place_id, suggestionTestData.museum)
  testPlaces.set(suggestionTestData.expensiveMuseum.place.place_id, suggestionTestData.expensiveMuseum)

  const rankedResults = rank(testPlaces, config)
  const expectedRankedResults = [suggestionTestData.expensiveMuseum, suggestionTestData.museum]

  expect(rankedResults).areEqualSuggestions(expectedRankedResults)
})

// check that higher rating item ranks higher
test("higher rating item ranking higher", () => {
  const config = suggestionTestData.prefMidBudgetFamilyEnt
  const testPlaces = new Map();
  testPlaces.set(suggestionTestData.mountain.place.place_id, suggestionTestData.mountain)
  testPlaces.set(suggestionTestData.highRatedMountain.place.place_id, suggestionTestData.highRatedMountain)

  const rankedResults = rank(testPlaces, config)
  const expectedRankedResults = [suggestionTestData.highRatedMountain, suggestionTestData.mountain]

  

  expect(rankedResults).areEqualSuggestions(expectedRankedResults)
})

// rank type matching over Budget and rating
test("Matching Type outranks Budget and rating", () => {
  const config = suggestionTestData.prefMidBudgetFamilyEnt
  const testPlaces = new Map();
  testPlaces.set(suggestionTestData.expensiveZoo.place.place_id, suggestionTestData.expensiveZoo)
  testPlaces.set(suggestionTestData.mountain.place.place_id, suggestionTestData.mountain)

  const rankedResults = rank(testPlaces, config)
  const expectedRankedResults = [suggestionTestData.expensiveZoo, suggestionTestData.mountain]

  expect(rankedResults).areEqualSuggestions(expectedRankedResults)
})


// make sure to filter out things we don’t want like lodging
// test("Filter Invalid Types", () => {
//   const config = suggestionTestData.prefMidBudgetFamilyEnt
//   const testPlaces = new Map();
//   testPlaces.set(suggestionTestData.expensiveMuseum.place.place_id, suggestionTestData.expensiveMuseum)
//   testPlaces.set(suggestionTestData.mountain.place.place_id, suggestionTestData.mountain)
//   testPlaces.set(suggestionTestData.lodging.place.place_id, suggestionTestData.lodging)

//   const rankedResults = rank(testPlaces, config)
//   const expectedRankedResults = [suggestionTestData.expensiveMuseum, suggestionTestData.mountain]

//   expect(rankedResults).areEqualSuggestions(expectedRankedResults)

// })

// ensure that the results are being sorted correctly
test("Sorted from highest rank to lowest", () => {
  const config = suggestionTestData.prefMidBudgetFamilyEnt;
  const testPlaces = new Map();
  testPlaces.set(suggestionTestData.aquarium.place.place_id, suggestionTestData.aquarium);
  testPlaces.set(suggestionTestData.prominentAquarium.place.place_id, suggestionTestData.prominentAquarium);
  testPlaces.set(suggestionTestData.museum.place.place_id, suggestionTestData.museum);
  testPlaces.set(suggestionTestData.expensiveMuseum.place.place_id, suggestionTestData.expensiveMuseum);
  testPlaces.set(suggestionTestData.mountain.place.place_id, suggestionTestData.mountain);
  testPlaces.set(suggestionTestData.highRatedMountain.place.place_id, suggestionTestData.highRatedMountain);

  const rankedResults = rank(testPlaces, config);

  for (let i = 0; i < rankedResults.length - 1; i++) {
    expect(rankedResults[i].score >= rankedResults[i + 1].score).toBeTruthy();
  }
})

expect.extend({
  areEqualSuggestions(test, expected) {
    if (test.length === expected.length) {
      for (let i = 0; i < test.length ; i++) {
        
        if(test[i].place.place_id !== expected[i].place.place_id) {
          return { pass: false, message: () => "ranking not equal" }
        }
			}
      return { pass: true, message: () => "arrays are equal" }
		} else {
      return { pass: false, message: () => "size not equal" }
    }
	}
});
