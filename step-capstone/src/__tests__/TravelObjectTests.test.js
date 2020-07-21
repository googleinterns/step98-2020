import React from 'react';
import Hotel from '../components/Hotel';
import Flight from '../components/Flight';
import renderer from 'react-test-renderer';

const hotelTestData = {
  type: 'hotel',
  name: ' Hotel ZED ',
  location: 'London',
  startDate: new Date(7, 7, 2020),
  endDate: new Date(7, 7, 2020),
  description: 'description',
  finalized: true
};

test('Hotel displays correctly', () => {
  const hotelComponent = renderer.create(
    <Hotel data={hotelTestData} />,
  );
  let test = hotelComponent.toJSON();
  expect(test).toMatchSnapshot();

});

const flightTestData = {
  finalized: true,
  type: "flight",
  departureAirport: "BOS",
  arrivalAirport: "SFO",
  startDate: new Date(2020, 7, 13, 10),
  endDate: new Date(2020, 7, 13, 12),
  description: "Additional notes"
};

test('Flight displays correctly', () => {
  const flightComponent = renderer.create(
    <Flight data={flightTestData} />,
  );
  let test = flightComponent.toJSON();
  expect(test).toMatchSnapshot();

});