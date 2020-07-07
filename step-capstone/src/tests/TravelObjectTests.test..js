import React from 'react';
import Hotel from '../components/Hotel';
import renderer from 'react-test-renderer';

const hotelTestData = {type : 'hotel',
 name : ' Hotel ZED ' ,
 location : 'London',
 checkIn : new Date(7, 7, 2020),
 checkOut:  new Date(7, 7, 2020),
 description: 'description',
 finalized : true };

test('Hotel displays correctly', () => {
  const hotelComponent = renderer.create(
    <Hotel hotelTestData ></Hotel>,
  );
  let test = hotelComponent.toJSON();
  expect(test).toMatchSnapshot();

});