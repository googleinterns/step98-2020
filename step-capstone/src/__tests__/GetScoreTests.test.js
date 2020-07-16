import '@testing-library/jest-dom'
import {getScore} from '../scripts/Suggestion'


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
