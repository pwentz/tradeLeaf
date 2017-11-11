import React, { Component, PropTypes } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import ImagePicker from './ImagePicker';
import Avatar from '../common/Avatar';
import { maybePermissionsError } from '../../api/utils';
import globalStyles from '../../styles/index';

export default class ProfilePhotoUploader extends Component {
  static defaultProps = {
    defaultImage: require('../../images/tradeLeafIcon.png'),
    avatarSize: 200
  };

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    uploadedPhoto: PropTypes.object,
    upload: PropTypes.func.isRequired,
    apiError: PropTypes.string,
    isPhotoUploaded: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      showPicker: false,
      hasSelectedImage: false
    }
  }

  onCancelled = () => {
    this.setState({
      showPicker: false
    })
  }

  onSelected = (imageSource) => {
    this.setState({
      hasSelectedImage: true,
      showPicker: false
    }, () => {
      this.upload(imageSource);
    });
  };

  showPicker = () => {
    if (this.props.inProgress) {
      return;
    };

    this.setState({
      showPicker: true
    });
  };

  upload = (imageSource) => {
    this.setState({
      hasSelectedImage: false
    }, () => {
      this.props.upload(imageSource);
    });
  };

  onImagePickerError = (error) => {
    if (maybePermissionsError(error)) {
      alert('Please update your phone settings to grant TradeLeaf permissions to your camera or camera roll.')
    } else {
      alert(error);
    }

    this.setState({
      showPicker: false
    })
  }

  render() {
    const { apiError, inProgress, isPhotoUploaded, uploadedPhoto, avatarSize } = this.props;

    const { showPicker, hasSelectedImage } = this.state;

    const currentAvatar = uploadedPhoto ? { uri: uploadedPhoto.imageUrl } : undefined;

    return (
      <View style={styles.container}>

        {!!apiError &&
          <Text style={globalStyles.errorText}>
            {apiError}
          </Text>
        }

        <View style={styles.avatarContainer}>
          <Avatar
            onPressEdit={inProgress ? null : this.showPicker}
            imageSource={currentAvatar}
            size={avatarSize}
          />
        </View>

        {showPicker &&
          <ImagePicker
            onError={this.onImagePickerError}
            onCancelled={this.onCancelled}
            onSelected={this.onSelected}
          />
        }
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 20
  }
});
