import React, { Component } from 'react';
import { Slider, Switch, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles, { yellow, blue, midGray } from '../../styles';
import PhotoUploader from '../photos/ProfilePhoto';

export default class extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    apiError: PropTypes.string,
    inProgress: PropTypes.bool,
  };

  get presentableRadius() {
    const radius = Math.floor(this.state.offer.radius);

    if (radius === 100) {
      return '∞';
    }

    if (radius === 1) {
      return `${radius} mile`;
    }

    return `${radius} miles`;
  }

  constructor(props) {
    super(props);
    this.state = {
      onRequestForm: false,
      offer: {
        photo: null,
        radius: 100,
      },
    };
  }

  switchScreens = () => {
    this.setState((prevState) => ({
      onRequestForm: !prevState.onRequestForm,
    }));
  };

  onPhotoUpload = (imageSource) => {
    this.setState((prev) => ({
      offer: {
        ...prev.offer,
        photo: { imageUrl: imageSource.uri },
      },
    }));
  };

  updateOfferRadius = (radius) => {
    this.setState((prev) => ({
      offer: { ...prev.offer, radius },
    }));
  };

  renderOfferForm() {
    return (
      <View style={styles.offerFormContainer}>
        <View style={styles.photoUploaderContainer}>
          <PhotoUploader
            inProgress={this.props.inProgress}
            upload={this.onPhotoUpload}
            uploadedPhoto={this.state.offer.photo}
            apiError={this.props.apiError}
            isPhotoUploaded={!!this.state.offer.photo}
            avatarSize={120}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text>Radius: {this.presentableRadius}</Text>
          <Slider
            minimumValue={1}
            maximumValue={100}
            value={100}
            minimumTrackTintColor={blue}
            maximumTrackTintColor={midGray}
            onValueChange={this.updateOfferRadius}
          />
        </View>
      </View>
    );
  }

  renderRequestForm() {
    return <View style={styles.requestFormContainer} />;
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.switchContainer}>
          <Text>Offer</Text>
          <Switch
            value={this.state.onRequestForm}
            onValueChange={this.switchScreens}
            onTintColor={blue}
            tintColor={blue}
            thumbTintColor={yellow}
          />
          <Text>Request</Text>
        </View>

        {this.state.onRequestForm ? this.renderRequestForm() : this.renderOfferForm()}
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  requestFormContainer: {
    height: '80%',
  },
  sliderContainer: {
    width: '80%',
  },
});