import React from 'react';

import { components, renderer } from '../../setup';

const noop = () => {}

it('<Avatar />', () => {
  const Avatar = components.Avatar;
  const component = renderer.create(
    <Avatar
      onPressEdit={noop}
    />
  );

  expect(component.toJSON()).toMatchSnapshot();
})

it('<Avatar onPressEdit={null} />', () => {
  const Avatar = components.Avatar;
  const component = renderer.create(
    <Avatar />
  );

  expect(component.toJSON()).toMatchSnapshot();
})
