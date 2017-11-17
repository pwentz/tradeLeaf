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
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'

export default class AccountRequirements extends Component {
  static defaultProps = {
    imageHeader: require('../../images/full-logo.png')
  }

  static propTypes = {
    upload: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    isPhotoUploaded: PropTypes.bool.isRequired,
    hasOffers: PropTypes.bool.isRequired,
    isLocationEnabled: PropTypes.bool.isRequired,
    userFirstName: PropTypes.string.isRequired,
    onLocationRequirementPress: PropTypes.func.isRequired,
    onContinuePress: PropTypes.func.isRequired,
    uploadedPhoto: PropTypes.object,
    apiError: PropTypes.string
  }

  conditionalColors = (pred) => {
    if (pred) {
      return { bgColor: yellow, fgColor: darkWhite }
    }

    return { bgColor: darkWhite, fgColor: yellow }
  }

  render() {
    const {
      upload, inProgress, apiError, uploadedPhoto, isPhotoUploaded,
      isLocationEnabled, hasOffers, userFirstName, imageHeader,
      onLocationRequirementPress, onContinuePress
    } = this.props;

    const hasLocationColors = this.conditionalColors(isLocationEnabled)
    const hasOffersColors = this.conditionalColors(hasOffers)
    const mayProceed = isLocationEnabled && hasOffers
    const continueColors = this.conditionalColors(mayProceed)

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

          <TouchableOpacity onPress={onLocationRequirementPress} disabled={isLocationEnabled}>
            <View style={styles.stepContainer}>

              <View style={[globalStyles.iconCircleContainer, {backgroundColor: yellow}]}>
                <View style={[globalStyles.iconCircleContainer, { backgroundColor: hasLocationColors.bgColor }]}>
                  <Icon
                    name='check'
                    size={22}
                    color={hasLocationColors.fgColor}
                    style={{margin: 4}}
                  />
                </View>
              </View>

              <View style={{marginLeft: 15}}>
                <Text style={{ color: isLocationEnabled ? blue : midGray }}>
                  Allow location services
                </Text>
              </View>

            </View>
          </TouchableOpacity>

          <View style={styles.stepContainer}>

            <View style={[globalStyles.iconCircleContainer, {backgroundColor: yellow}]}>
              <View style={[globalStyles.iconCircleContainer, { backgroundColor: hasOffersColors.bgColor }]}>
                <Icon
                  name='check'
                  size={22}
                  color={hasOffersColors.fgColor}
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

          <View style={[globalStyles.container, {marginTop: (windowHeight * 0.075)}]}>
            <View style={[globalStyles.iconCircleContainer, {backgroundColor: yellow}]}>
              <TouchableOpacity disabled={!mayProceed} onPress={onContinuePress}>
                <View style={[ globalStyles.iconCircleContainer, {backgroundColor: continueColors.bgColor}]}>
                  <Text style={[styles.wideBtnText, { color: continueColors.fgColor }]}>
                    continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
  wideBtnText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: (windowHeight * 0.02),
    marginBottom: (windowHeight * 0.02),
    marginLeft: (windowWidth * 0.275),
    marginRight: (windowWidth * 0.275)
  }
})
