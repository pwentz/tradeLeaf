import React, { Component } from 'react';

import { Text } from 'react-native';

import {
  handleIfApiError,
  displayableError
} from '../../api/utils';

import { connect } from 'react-redux';
import ProfilePhotoUploader from '../../components/photos/ProfilePhoto';

class NotificationContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inProgress: false,
      error: null,
      uploaded: false
    }
  }

  upload = (imageSource) => {
    const { auth, screenProps, dispatch } = this.props;
    const { userId, token } = auth;
    const { actions } = screenProps;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.photos.uploadAndCreateProfilePhoto(userId, token, imageSource));
        .then(() => {
          this.setState({ inProgress: false })
          console.log("SUCCESS")
        })
        .catch(error => {
          handleIfApiError(error, err => {
            this.setState({ inProgress: false, error: err })
            console.log(err)
          })
        })
    })
  }

  render() {
    return (
      <ProfilePhotoUploader
        inProgress={this.state.inProgress}
        upload={this.upload}
        apiError={this.state.error}
        uploaded={this.state.uploaded}
      />
    )
  }
}

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps)(NotificationContainer);
