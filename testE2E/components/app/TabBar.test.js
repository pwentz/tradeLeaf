import React from 'react';

import { components, renderer } from '../../setup';

const noop = () => {}
const routes = ['Home', 'Search', 'Notifications', 'Inbox']
const nav = { navigate: noop, state: { routes, index: 0 } }

it('<TabBar />', () => {
  const TabBar = components.TabBar;
  const component = renderer.create(
    <TabBar
      navigation={nav}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
