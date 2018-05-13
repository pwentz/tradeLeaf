import React from 'react';
import { components, renderer } from '../../setup';

const noop = () => {};

it('<ChatPreview />', () => {
  const ChatPreview = components.ChatPreview;
  const component = renderer.create(
    <ChatPreview recipient={{}} currentUser={{}} handlePress={noop} tradeChatId={'123'} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});
