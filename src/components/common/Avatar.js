import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import globalStyles, {
  blue,
  windowHeight,
  windowWidth,
  darkWhite,
  midGray
} from '../../styles/index';

import { secureImageSource } from '../../api/utils';

export default class Avatar extends Component {
  static defaultProps = {
    imageSource: require('../../images/tradeLeafIcon.png'),
    size: 40
  };

  static propTypes = {
    onPressEdit: PropTypes.func,
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
    const { onPressEdit } = this.props;

    if (onPressEdit) {
      const { size, imageSource } = this.props;
      const circle = { height: size, width: size, borderRadius: size / 2 };

      const editIconTop = windowHeight * (size / 869)
      const editIconLeft = windowWidth * (size / 571)
      const editIconSize = size / 5.5

      let imageSourceSecure = secureImageSource(imageSource);

      return (
        <View style={styles.container}>
          <Image
            source={imageSourceSecure}
            style={[styles.imageBorder, circle]}
          />
          <View style={{ position: 'absolute', top: editIconTop, left: editIconLeft }}>
            <TouchableOpacity onPress={onPressEdit}>
              <View style={styles.editIconContainer}>
                <Icon
                  name='pencil'
                  size={editIconSize}
                  color={darkWhite}
                  style={{margin: 4}}
                >
                </Icon>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    borderColor: midGray
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editIconPosition: {
    position: 'absolute',
    top: (windowHeight * 0.23),
    left: (windowWidth * 0.35),
  },
  editIconContainer: {
    borderRadius: 80,
    backgroundColor: blue,
    overflow: 'hidden'
  }
});
