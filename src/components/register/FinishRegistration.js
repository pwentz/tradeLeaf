import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Feather'

import ProfilePhotoUploader from '../photos/ProfilePhoto';

import globalStyles, {
  windowHeight,
  windowWidth,
  blue,
  midGray,
  yellow,
  darkWhite
} from '../../styles/index';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native'

export default class FinishRegistration extends Component {
  static defaultProps = {
    imageHeader: require('../../images/full-logo.png')
  }

  static propTypes = {
    upload: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    isPhotoUploaded: PropTypes.bool.isRequired,
    hasOffers: PropTypes.bool.isRequired,
    hasLocationEnabled: PropTypes.bool.isRequired,
    userFirstName: PropTypes.string.isRequired,
    uploadedPhoto: PropTypes.object,
    apiError: PropTypes.string
  }

  iconColors = (pred) => {
    if (pred) {
      return { iconBackgroundColor: yellow, iconColor: darkWhite }
    }

    return { iconBackgroundColor: darkWhite, iconColor: yellow }
  }

  render() {
    const {
      upload, inProgress, apiError, uploadedPhoto, isPhotoUploaded,
      hasLocationEnabled, hasOffers, userFirstName, imageHeader
    } = this.props;

    const hasLocationColors = this.iconColors(hasLocationEnabled)
    const hasOffersColors = this.iconColors(hasOffers)

    return (
      <View>
        <View style={styles.fillerTop}></View>

        <View style={styles.imageContainer}>
          <Image
            source={imageHeader}
            style={styles.imageHeader}
          />
        </View>

        <View style={styles.fillerMed}></View>
        <View>
          <ProfilePhotoUploader
            inProgress={inProgress}
            upload={upload}
            uploadedPhoto={uploadedPhoto}
            apiError={apiError}
            isPhotoUploaded={isPhotoUploaded}
            avatarSize={150}
          />
        </View>

        <View style={{ height: (windowHeight * 0.3), zIndex: -1 }}></View>

        <View style={globalStyles.container}>
          <Text style={{ textAlign: 'center' }}>
            Welcome, {userFirstName}!
          </Text>

          <Text style={{ textAlign: 'center' }}>
            Follow these steps to get started:
          </Text>

          <View style={styles.stepContainer}>

            <View style={[styles.iconContainer, {backgroundColor: yellow}]}>
              <View style={[styles.iconContainer, { backgroundColor: hasLocationColors.iconBackgroundColor }]}>
                <Icon
                  name='check'
                  size={22}
                  color={hasLocationColors.iconColor}
                  style={{margin: 4}}
                />
              </View>
            </View>

            <View style={{marginLeft: 15}}>
              <Text style={{ color: hasLocationEnabled ? blue : midGray }}>
                Allow location services
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>

            <View style={[styles.iconContainer, {backgroundColor: yellow}]}>
              <View style={[styles.iconContainer, { backgroundColor: hasOffersColors.iconBackgroundColor }]}>
                <Icon
                  name='check'
                  size={22}
                  color={hasOffersColors.iconColor}
                  style={{margin: 4}}
                />
              </View>
            </View>

            <View style={{marginLeft: 15}}>
              <Text style={{ color: hasOffers ? blue : midGray }}>
                Post an offer
              </Text>
            </View>
          </View>

          <View>
            <TouchableHighlight style={globalStyles.actionButton} onPress={this.props.logout}>
              <Text style={globalStyles.actionButtonText}>
                LOGOUT
              </Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageHeader: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
    width: (windowWidth * 0.5),
    height: (windowHeight * 0.25)
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fillerTop: {
    height: (windowHeight * 0.05)
  },
  fillerMed: {
    height: (windowHeight * 0.175)
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25
  },
  iconContainer: {
    borderRadius: 80,
    overflow: 'hidden',
    margin: 1,
  }
})
