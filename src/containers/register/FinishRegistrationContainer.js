import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Feather'

import ProfilePhotoUploader from '../../components/photos/ProfilePhoto';

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

import { connect } from 'react-redux'

class FinishRegistrationContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      error: null,
      isPhotoUploaded: false
    };
  };

  upload = (imageSource) => {
    const { auth, screenProps, dispatch } = this.props;
    const { userId, token } = auth;
    const { actions } = screenProps;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.photo.uploadAndCreateProfilePhoto(userId, token, imageSource))
        .then(() => {
          return dispatch(actions.user.getUser(userId, token))
        })
        .then(() => {
          this.setState({ inProgress: false, isPhotoUploaded: true })
        })
        .catch(error => {
          handleIfApiError(error, err => {
            this.setState({ inProgress: false, error: err })
          })
        })
    })
  }

  render() {
    const { auth, userMeta, hasLocationEnabled } = this.props;
    const currentUser = userMeta[auth.userId];
    const hasOffers = currentUser.offers.length > 0

    const enableLocationIconColor = hasLocationEnabled ? yellow : midGray

    const createOfferIconColor = hasOffers ? yellow : midGray
    console.log("PROPS: ", this.props)

    return (
      <View>
        <View style={{height:80}}></View>

        <View>
          <ProfilePhotoUploader
            inProgress={this.state.inProgress}
            upload={this.upload}
            uploadedPhoto={currentUser.photo}
            apiError={this.state.error}
            isPhotoUploaded={this.state.isPhotoUploaded}
            avatarSize={150}
          />
        </View>

        <View style={{ height: (windowHeight * 0.3), zIndex: -1 }}></View>

        <View style={globalStyles.container}>
          <Text style={{ textAlign: 'center' }}>
            Welcome, {currentUser.firstName}!
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
    );
  };
};

const styles = StyleSheet.create({
  textContainer: {
    textAlign: 'center'
  }
})

function mapStateToProps(state, props) {
  const { params } = props.navigation.state

  return {
    ...state,
    hasLocationEnabled: params && params.hasLocationEnabled,
  };
};

export default connect(mapStateToProps)(FinishRegistrationContainer);
