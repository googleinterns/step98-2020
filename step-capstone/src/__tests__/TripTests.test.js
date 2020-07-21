import React from 'react';
import Trip from '../components/Trip';
import renderer from 'react-test-renderer';
import {FirebaseContext } from '../components/Firebase';
import firebaseMock from '../components/firebaseMock'

test('Trip displays correctly', async () => {
  sessionStorage.setItem("userId", "testUser");
  sessionStorage.setItem("tripId", "testTrip");
  
  const tripComponent = renderer.create(
    <FirebaseContext.Provider value={new firebaseMock()}>
      <Trip/>
    </FirebaseContext.Provider>
    
  );
  //we need to wait for a second to let promises resolve before taking our snapshot
  await new Promise(res => setTimeout(() => { res() }, 0.5))
  let test = tripComponent.toJSON();
  expect(test).toMatchSnapshot();
});