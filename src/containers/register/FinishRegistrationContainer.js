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
      uploaded: false
    };
  };

  upload = (imageSource) => {
    const { auth, screenProps, dispatch } = this.props;
    const { userId, token } = auth;
    const { actions } = screenProps;

    // this.setState({ inProgress: true }, () => {
    //   dispatch(actions.photos.uploadAndCreateProfilePhoto(userId, token, imageSource))
    //     .then(() => {
    //       this.setState({ inProgress: false })
    //       console.log("SUCCESS")
    //     })
    //     .catch(error => {
    //       handleIfApiError(error, err => {
    //         this.setState({ inProgress: false, error: err })
    //         console.log(err)
    //       })
    //     })
    // })
  }

  render() {
    return (
      <View>
        <View style={{height:80}}></View>

        <View>
          <ProfilePhotoUploader
            inProgress={this.state.inProgress}
            upload={this.upload}
            apiError={this.state.error}
            uploaded={this.state.uploaded}
            avatarSize={150}
          />
        </View>

        <View style={{ height: (windowHeight * 0.3), zIndex: -1 }}></View>
        <View style={globalStyles.container}>
          <TouchableHighlight
            style={globalStyles.actionButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={globalStyles.actionButtonText}>
              back
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };
};

function mapStateToProps(state) {
  return state;
};

export default connect(mapStateToProps)(FinishRegistrationContainer);
