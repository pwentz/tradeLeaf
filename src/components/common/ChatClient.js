import React from 'react';
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
import { yellow, darkWhite, lightWhite, lightGray, blue } from '../../styles';

export default (props) => {
  const renderBubble = (bubbleProps) => {
    const bubbleStyleProps = {
      ...bubbleProps,
      wrapperStyle: { right: { backgroundColor: yellow }, left: { backgroundColor: lightGray } },
      textStyle: { right: { color: lightWhite }, left: { color: blue } },
    };
    return <Bubble {...bubbleStyleProps} />;
  };

  const renderTime = (timeProps) => {
    const timeStyleProps = {
      ...timeProps,
      textStyle: { right: { color: lightWhite }, left: { color: blue } },
    };

    return <Time {...timeStyleProps} />;
  };

  const newProps = { ...props, renderBubble, renderTime };

  return <GiftedChat {...newProps} />;
};
