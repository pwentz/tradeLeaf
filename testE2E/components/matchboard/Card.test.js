import React from 'react';

import { components, renderer } from '../../setup';
import { authedUserMatches } from '../../mocks/mockData';

const noop = () => {}

const match = authedUserMatches[0]

it('<Card />', () => {
  const Card = components.Card;
  const component = renderer.create(
    <Card
      onAccept={noop}
      onDecline={noop}
      inProgress={false}
      user={match.user}
      offer={match.offer}
      distance={match.distance}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
