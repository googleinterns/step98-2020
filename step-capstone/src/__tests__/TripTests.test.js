import React from 'react';
import Trip from '../components/Trip';
import renderer from 'react-test-renderer';
import {FirebaseContext } from '../components/Firebase';
import firebaseMock from '../components/firebaseMock'

test('Trip displays correctly', () => {
  sessionStorage.setItem("userId", "testUser");
  sessionStorage.setItem("tripId", "testTrip");
  
  const tripComponent = renderer.create(
    <FirebaseContext.Provider value={new firebaseMock()}>
      <Trip/>
    </FirebaseContext.Provider>
    
  );

  let test = tripComponent.toJSON();
  expect(test).toMatchSnapshot();
});