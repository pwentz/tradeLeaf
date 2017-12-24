import React, { Component } from 'react';
import Lightbox from 'react-native-lightbox';

import {
  TouchableOpacity,
  ScrollView
} from 'react-native';

const LightboxImage = (props) => {
  const onChangeProps = {
    ...(props.onOpen ? { onOpen: props.onOpen } : {}),
    ...(props.onClose ? { onClose: props.onClose } : {})
  }

  const swipeToDismiss = props.swipeToDismiss === undefined ? true
                                                            : props.swipeToDismiss
  return (
    <Lightbox
      navigator={null}
      swipeToDismiss={swipeToDismiss}
      {...onChangeProps}
    >
      {props.children}
    </Lightbox>
  );
};

export default LightboxImage;
