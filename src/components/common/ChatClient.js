import React from 'react';
import { View } from 'react-native';
import { GiftedChat, Bubble, Time, Send } from 'react-native-gifted-chat';
import {
  windowWidth,
  windowHeight,
  yellow,
  darkWhite,
  lightWhite,
  lightGray,
  blue,
} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  const renderSend = (sendProps) => (
    <Send {...sendProps}>
      <View style={{ marginBottom: windowHeight * 0.01, marginRight: windowWidth * 0.025 }}>
        <Icon size={32} color={yellow} name="send" />
      </View>
    </Send>
  );

  const newProps = { ...props, renderBubble, renderTime, renderSend };

  return <GiftedChat {...newProps} />;
};
