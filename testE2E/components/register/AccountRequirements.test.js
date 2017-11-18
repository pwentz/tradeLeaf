import React from 'react';

import { components, renderer } from '../../setup';
import {
  authedUser
} from '../../mocks/mockData';

const noop = () => {}

it('<AccountRequirements />', () => {
  const AccountRequirements = components.AccountRequirements;
  const component = renderer.create(
    <AccountRequirements
      upload={noop}
      inProgress={false}
      isPhotoUploaded={false}
      hasOffers={false}
      isLocationEnabled={false}
      uploadedPhoto={authedUser.photo}
      userFirstName={authedUser.firstName}
      onLocationRequirementPress={noop}
      onContinuePress={noop}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
})
