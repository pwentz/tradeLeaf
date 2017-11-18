import React from 'react';

import { components, renderer } from '../../setup';

const noop = () => {}

it('<RegisterForm />', () => {
  const RegisterForm = components.RegisterForm;
  const component = renderer.create(
    <RegisterForm
      onSubmitRegister={noop}
      backToLogin={noop}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
})
