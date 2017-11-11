import React, { Component, PropTypes } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import ImagePicker from './ImagePicker';
import Avatar from '../common/Avatar';
import { maybePermissionsError } from '../../api/utils';
import globalStyles from '../../styles/index';

export default class ProfilePhotoUploader extends Component {
  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    profilePhoto: PropTypes.object,
    upload: PropTypes.func.isRequired,
    apiError: PropTypes.string,
    // uploaded = api call uploaded photo was successful
    uploaded: PropTypes.bool.isRequired,
    // nonProfile = we're not on the profile photo screen
    nonProfile: PropTypes.bool
  };

  constructor(props) {
    super(props)
    this.state = {
      imageSource: null, // locally picked image
      showPicker: false,
      selectedImage: false
    }
  }

  onCancelled = () => {
    this.setState({
      showPicker: false
    })
  }

  onSelected = (imageSource) => {
    this.setState({
      selectedImage: true,
      imageSource: imageSource,
      showPicker: false
    }, () => {
      this.upload();
    });
  };

  showPicker = () => {
    this.setState({
      showPicker: true
    });
  };

  upload = () => {
    if (this.props.inProgress || !this.state.imageSource) {
      return;
    };

    this.setState({
      selectedImage: false
    }, () => {
      this.props.upload(this.state.imageSource);
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
    const { apiError, inProgress, uploaded, profilePhoto, nonProfile, avatarSize } = this.props;

    const { imageSource, showPicker, selectedImage } = this.state;

    const currentAvatar = profilePhoto ? { uri: profilePhoto.imageUrl } : undefined;

    const showSelectedImage = selectedImage || inProgress;
    const gotAnyImage = imageSource || profilePhoto;

    return (
      <View style={styles.container}>

        {!!apiError &&
          <Text style={globalStyles.errorText}>
            {apiError}
          </Text>
        }

        {!showSelectedImage && !nonProfile &&
          <View style={{alignItems: 'center', paddingTop:15, paddingBottom:20}}>
            <Avatar
              onPressEdit={() => console.log("HIT")}
              imageSource={currentAvatar}
              size={avatarSize || 200}
            />
          </View>
        }

        {showSelectedImage &&
          <Image
            source={imageSource}
            style={{flex:1, marginBottom: 10}}
          />
        }
{/*
        <TouchableOpacity
          onPress={this.showPicker}
          disabled={inProgress}
          style={[globalStyles.actionButton, {backgroundColor:'white', borderColor:'black', borderWidth:1}]}
        >
          <Text style={globalStyles.actionButtonText}>
            {!gotAnyImage ? '+ UPLOAD PHOTO' : '+ UPLOAD PHOTO'}
          </Text>
        </TouchableOpacity>
 */}
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
  header: {
    textAlign: 'center'
  }
});
