import React, { Component, PropTypes } from 'react';

import ProfilePhotoUploader from '../../components/photos/ProfilePhoto';

import globalStyles, {
  windowHeight
} from '../../styles/index';

import {
  Text,
  View,
  TouchableHighlight
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
    const { auth, userMeta } = this.props;
    const currentUser = userMeta[auth.userId];
    
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
        </View>
      </View>
    );
  };
};

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps)(FinishRegistrationContainer);
