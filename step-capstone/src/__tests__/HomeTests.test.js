import React from 'react';
import Home from '../components/Home'
import renderer from 'react-test-renderer';

test('Home page displays correctly', () => {
  const homeComponent = renderer.create(
    <Home />,
  );
  let test = homeComponent.toJSON();
  expect(test).toMatchSnapshot();

});