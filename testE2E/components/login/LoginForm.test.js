import React from 'react';

import { components, renderer } from '../../setup';

const noop = () => {}

it('<LoginForm />', () => {
  const LoginForm = components.LoginForm;
  const component = renderer.create(
    <LoginForm
      onSubmitLogin={noop}
      navigateToRegister={noop}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
})
