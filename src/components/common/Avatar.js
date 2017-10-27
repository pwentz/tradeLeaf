import React, { Component, PropTypes } from 'react';

import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { secureImageSource } from '../../api/utils';

export default class Avatar extends Component {
  static defaultProps = {
    imageSource: require('../../images/tradeLeafIcon.png'),
    size: 40
  };

  static propTypes = {
    onAvatarPress: PropTypes.func,
    renderOverlay: PropTypes.func
  };

  renderImage() {
    const { size, imageSource } = this.props;
    const circle = { height: size, width: size, borderRadius: size / 2 };

    let imageSourceSecure = secureImageSource(imageSource);

    return (
      <Image
        source={imageSourceSecure}
        style={[styles.imageBorder, circle]}
      />
    );
  };

  renderTouchableImage() {
    const { onAvatarPress } = this.props;

    if (onAvatarPress) {
      return (
        <TouchableOpacity onPress={onAvatarPress}>
          {this.renderImage()}
        </TouchableOpacity>
      );
    };

    return this.renderImage();
  };

  render() {
    const { size, imageSource, renderOverlay } = this.props;
    const circle = { height: size, width: size, borderRadius: size / 2 };

    return (
      <View style={[styles.avatarStyle, circle]}>
        { this.renderTouchableImage() }
        { renderOverlay && renderOverlay() }
      </View>
    );
  };
};

const styles = StyleSheet.create({
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBorder: {
    borderWidth: 1,
    borderColor: 'grey'
  }
});
