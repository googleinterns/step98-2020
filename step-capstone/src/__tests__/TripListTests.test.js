import React from 'react';
import TripList from '../components/TripList';
import renderer from 'react-test-renderer';
import {FirebaseContext } from '../components/Firebase';
import firebaseMock from '../setupTests'

// jest.mock('firebase');
test('TripList displays correctly', () => {
  sessionStorage.setItem("userId", "testUser");
  const tripListComponent = renderer.create(
    <FirebaseContext.Provider value={firebaseMock}>
    
      <TripList/>
    </FirebaseContext.Provider>
    
  );
  let test = tripListComponent.toJSON();
  expect(test).toMatchSnapshot();

});