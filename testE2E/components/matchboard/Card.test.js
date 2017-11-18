import React from 'react';

import { components, renderer } from '../../setup';

const noop = () => {}

it('<Card />', () => {
  const Card = components.Card;
  const component = renderer.create(
    <Card />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
