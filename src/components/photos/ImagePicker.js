import React, { Component, PropTypes } from 'react';

var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Choose Image',
  storageOptions: {
    skipBackup: true, //TODO
    path: 'images'
  },
  noData: true,
  quality: 0.1
};

export default class MyImagePicker extends Component {
  static propTypes = {
    onError: PropTypes.func.isRequired,
    onCancelled: PropTypes.func.isRequired,
    onSelected: PropTypes.func.isRequired
  }

  showImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        this.props.onCancelled();
      }
      else if (response.error) {
        this.props.onError(response.error);
      }
      else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.props.onSelected({uri: response.uri});
      }
    });
  }

  componentWillMount() {
    this.showImagePicker();
  }

  render() {
    return null;
  }
}
