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

  get canSubmit() {
    const { offer, request } = this.state;

    return offer.photo && offer.category && request.category;
  }

  get initialState() {
    return {
      onRequestForm: false,
      offer: {
        photo: null,
        description: '',
        radius: 100,
        category: null,
      },
      request: {
        description: '',
        category: null,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = this.initialState;
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

  updateOfferCategory = (categoryId) => {
    this.setState((prev) => ({
      offer: { ...prev.offer, category: categoryId },
    }));
  };

  updateRequestDescription = (description) => {
    this.setState((prev) => ({
      request: {
        ...prev.request,
        description,
      },
    }));
  };

  updateRequestCategory = (categoryId) => {
    this.setState((prev) => ({
      request: { ...prev.request, category: categoryId },
    }));
  };

  onSubmit = () => {
    const { offer, request } = this.state;

    this.props.onSubmit(offer, request).then(() => this.setState(this.initialState));
  };

  _renderCategory(category, selectedCategory, onPress) {
    const isSelectedCategory = selectedCategory === category.id;

    return (
      <TouchableOpacity
        key={category.id}
        style={[styles.category, { backgroundColor: isSelectedCategory ? yellow : blue }]}
        onPress={onPress}
      >
        <Text style={isSelectedCategory ? styles.selectedCategoryText : { color: 'white' }}>
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  }

  renderCategories(updateCategory, selectedCategory) {
    // set height based on element count so all can be rendered
    const scrollViewHeight = selectedCategory ? 100 : this.props.categories.length / 3.5 * 100;

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
            if (selectedCategory) {
              if (selectedCategory === category.id) {
                return this._renderCategory(category, selectedCategory, () => updateCategory(null));
              }
              return;
            }
            return this._renderCategory(category, selectedCategory, () =>
              updateCategory(category.id)
            );
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
            placeholder="describe your thing"
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
        {this.renderCategories(this.updateOfferCategory, this.state.offer.category)}
        <View style={styles.sliderContainer}>
          <Text style={styles.header}>
            {Math.floor(this.state.offer.radius) === 100
              ? 'I can mail this'
              : `I can travel ${this.presentableRadius} to trade this`}
          </Text>
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
        <View>
          <TextInput
            style={globalStyles.liteInput}
            autoCapitalize="none"
            value={this.state.request.description}
            onChangeText={this.updateRequestDescription}
            placeholder="describe what you want"
            multiline={true}
            maxLength={80}
          />
        </View>
        {this.renderCategories(this.updateRequestCategory, this.state.request.category)}
        <TouchableOpacity
          style={globalStyles.actionButtonWide}
          disabled={!this.canSubmit}
          onPress={this.onSubmit}
        >
          <Text style={[globalStyles.actionButtonText, styles.submitButton]}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.header}>Offer</Text>
          <Switch
            value={this.state.onRequestForm}
            onValueChange={this.switchScreens}
            onTintColor={blue}
            tintColor={blue}
            thumbTintColor={yellow}
          />
          <Text style={styles.header}>Request</Text>
        </View>

        {this.state.onRequestForm ? this.renderRequestForm() : this.renderOfferForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15%',
    marginRight: '20%',
    marginLeft: '20%',
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
  },
  requestFormContainer: {
    height: '60%',
    flexDirection: 'column',
    alignItems: 'center',
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
  selectedCategoryText: {
    color: blue,
    fontSize: 18,
    padding: '1%',
  },
  submitButton: {
    marginBottom: '10%',
  },
});
