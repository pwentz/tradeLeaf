import React, { Component } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Slider,
  Switch,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import globalStyles, { yellow, blue, midGray } from '../../styles';
import PhotoUploader from '../photos/ProfilePhoto';

export default class extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
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
        description: '',
        radius: 100,
        category: null,
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

  updateOfferDescription = (description) => {
    this.setState((prev) => ({
      offer: { ...prev.offer, description },
    }));
  };

  updateOfferCategory(categoryId) {
    this.setState((prev) => ({
      offer: { ...prev.offer, category: categoryId },
    }));
  }

  handleFocus = (inputIdx) => {
    return;
  };

  renderCategory(category, onPress) {
    const { offer } = this.state;
    const isSelectedCategory = offer.category === category.id;

    const textStyles = isSelectedCategory ? { color: blue, fontSize: 18 } : { color: 'white' };

    return (
      <TouchableOpacity
        key={category.id}
        style={[styles.category, { backgroundColor: isSelectedCategory ? yellow : blue }]}
        onPress={onPress}
      >
        <Text style={textStyles}>{category.name}</Text>
      </TouchableOpacity>
    );
  }

  renderCategories() {
    const { offer } = this.state;
    // set height based on element count so all can be rendered
    const scrollViewHeight = offer.category ? 100 : this.props.categories.length / 3.5 * 100;

    return (
      <View style={[globalStyles.overlay, { backgroundColor: 'white', marginTop: '5%' }]}>
        <Text style={styles.header}>Category:</Text>
        <ScrollView
          contentContainerStyle={[
            globalStyles.container,
            { width: `${scrollViewHeight}%`, height: '50%' },
          ]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {this.props.categories.map((category) => {
            if (offer.category) {
              if (offer.category === category.id) {
                return this.renderCategory(category, () => this.updateOfferCategory(null));
              }
              return;
            }
            return this.renderCategory(category, () => this.updateOfferCategory(category.id));
          })}
        </ScrollView>
      </View>
    );
  }

  renderOfferForm() {
    const { offer } = this.state;
    return (
      <View style={styles.offerFormContainer}>
        <View>
          <TextInput
            style={globalStyles.liteInput}
            autoCapitalize="none"
            value={this.state.offer.description}
            onChangeText={this.updateOfferDescription}
            placeholder="Description"
            multiline={true}
            maxLength={80}
          />
        </View>
        <View style={styles.photoUploaderContainer}>
          <PhotoUploader
            inProgress={this.props.inProgress}
            upload={this.onPhotoUpload}
            uploadedPhoto={this.state.offer.photo}
            apiError={this.props.apiError}
            avatarSize={120}
          />
        </View>
        {this.renderCategories()}
        <View style={styles.sliderContainer}>
          <Text style={styles.header}>Radius: {this.presentableRadius}</Text>
          <Slider
            minimumValue={1}
            maximumValue={100}
            value={this.state.offer.radius}
            minimumTrackTintColor={blue}
            maximumTrackTintColor={midGray}
            onValueChange={this.updateOfferRadius}
          />
        </View>
      </View>
    );
  }

  renderRequestForm() {
    return (
      <View style={styles.requestFormContainer}>
        <TouchableOpacity style={globalStyles.actionButtonWide}>
          <Text style={globalStyles.actionButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
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
    height: '15%',
  },
  photoUploaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerFormContainer: {
    height: '85%',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  requestFormContainer: {
    height: '80%',
  },
  sliderContainer: {
    width: '80%',
    marginBottom: '5%',
  },
  category: {
    padding: '1.5%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
  },
});
