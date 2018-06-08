import React, { Component } from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles, { yellow, blue } from '../../styles';
import PhotoUploader from '../photos/ProfilePhoto';

export default class extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    apiError: PropTypes.string,
    inProgress: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      onRequestForm: false,
      offerPhoto: null,
    };
  }

  switchScreens = () => {
    this.setState((prevState) => ({
      onRequestForm: !prevState.onRequestForm,
    }));
  };

  onPhotoUpload = (imageSource) => {
    this.setState({
      offerPhoto: { imageUrl: imageSource.uri },
    });
  };

  renderOfferForm() {
    return (
      <View style={styles.offerFormContainer}>
        <View style={styles.photoUploaderContainer}>
          <PhotoUploader
            inProgress={this.props.inProgress}
            upload={this.onPhotoUpload}
            uploadedPhoto={this.state.offerPhoto}
            apiError={this.props.apiError}
            isPhotoUploaded={!!this.state.offerPhoto}
            avatarSize={120}
          />
        </View>
      </View>
    );
  }

  renderRequestForm() {
    return <View style={styles.requestFormContainer} />;
  }

  render() {
    const { offerPhoto, onRequestForm } = this.state;
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.switchContainer}>
          <Text>Offer</Text>
          <Switch
            value={onRequestForm}
            onValueChange={this.switchScreens}
            onTintColor={blue}
            tintColor={blue}
            thumbTintColor={yellow}
          />
          <Text>Request</Text>
        </View>

        {onRequestForm ? this.renderRequestForm() : this.renderOfferForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '20%',
  },
  photoUploaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerFormContainer: {
    height: '80%',
  },
  requestFormContainer: {
    height: '80%',
  },
});
