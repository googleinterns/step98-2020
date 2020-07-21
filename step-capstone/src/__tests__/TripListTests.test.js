import React from 'react';
import TripList from '../components/TripList';
import renderer from 'react-test-renderer';
import {FirebaseContext } from '../components/Firebase';
import firebaseMock, {testTrips} from '../components/firebaseMock'


 test('TripList displays correctly', async () => {
  debugger; 
  sessionStorage.setItem("userId", "testUser");
  const tripListComponent = renderer.create(
    <FirebaseContext.Provider value={new firebaseMock()}>
      <TripList/>
    </FirebaseContext.Provider>
  );
  //we need to wait for a second to let promises resolve before taking our snapshot
  await new Promise(res => setTimeout(() => { res() }, 0.5))
  let test = tripListComponent.toJSON();
  
  expect(test).toMatchSnapshot();
});