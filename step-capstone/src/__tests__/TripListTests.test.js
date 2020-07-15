import React from 'react';
import TripList from '../components/TripList';
import renderer from 'react-test-renderer';
import {FirebaseContext } from '../components/Firebase';
import firebaseMock, {testTrips} from '../components/firebaseMock'


test('TripList displays correctly', () => {
  debugger; 
  sessionStorage.setItem("userId", "testUser");
  const tripListComponent = renderer.create(
    <FirebaseContext.Provider value={new firebaseMock()}>
      <TripList/>
    </FirebaseContext.Provider>
    
   );

  let test = tripListComponent.toJSON();
  expect(test).toMatchSnapshot();

  // expect(tripListComponent.instance.state.trips).toBe(testTrips);
});