import react from 'react'
import '@testing-library/jest-dom'

import {rank} from '../scripts/Suggestion'
import {suggestionTestData} from "../testData/SuggestionTestData"

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

// TODO: make sure to filter out things we don’t want like lodging
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
