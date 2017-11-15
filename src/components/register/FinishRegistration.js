import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Feather'

import ProfilePhotoUploader from '../photos/ProfilePhoto';

import globalStyles, {
  windowHeight,
  blue,
  midGray,
  yellow
} from '../../styles/index';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'

export default class FinishRegistration extends Component {
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

  render() {
    const {
      upload, inProgress, apiError, uploadedPhoto, isPhotoUploaded,
      hasLocationEnabled, hasOffers, userFirstName
    } = this.props;

    const enableLocationIconColor = hasLocationEnabled ? yellow : midGray

    const createOfferIconColor = hasOffers ? yellow : midGray

    return (
      <View>
        <View style={{height:80}}></View>

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

          <View>
            <Icon
              name='check'
              size={28}
              color={enableLocationIconColor}
            />
            <Text style={{ color: hasLocationEnabled ? blue : midGray }}>
              Allow location services
            </Text>
          </View>

          <View>
            <Icon
              name='check'
              size={28}
              color={createOfferIconColor}
            />
            <Text style={{ color: hasOffers ? blue : midGray }}>
              Post an offer
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
