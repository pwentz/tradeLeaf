import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from '../common/Avatar';
import Icon from 'react-native-vector-icons/Foundation';
import globalStyles, { midGray, lightGray, lightWhite, blue, yellow } from '../../styles';
import { cappedString } from '../../api/utils';

/*
offer = {
  id,
  category: string,
  description: string,
  request,
  photo,
  userId
}
*/

export default class extends Component {
  static propTypes = {
    offer: PropTypes.object.isRequired,
    onTrashPress: PropTypes.func.isRequired,
  };

  onTrashPress = () => {
    const { offer, onTrashPress } = this.props;

    Alert.alert(
      'Remove offer?',
      'You will stop receiving matches for this offer. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: onTrashPress(offer.id), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  render() {
    const { offer } = this.props;
    const offerPhoto = offer.photo ? { uri: offer.photo.imageUrl } : undefined;

    return (
      <View style={[globalStyles.rowContainer, { backgroundColor: 'white' }]}>
        <View style={globalStyles.rowAvatarContainer}>
          <Avatar size={52} imageSource={offerPhoto} />
        </View>

        <View style={{ width: '75%' }}>
          <View style={styles.upperContentContainer}>
            <View>
              <Text style={[styles.offerDescription, styles.rowText]}>
                {cappedString(offer.description, 24)}
              </Text>
              <Text style={[styles.rowText, styles.category]}>
                {cappedString(offer.category, 40)}
              </Text>
            </View>
            <TouchableOpacity style={styles.trashCanContainer} onPress={this.onTrashPress}>
              <Icon size={28} color="maroon" name="trash" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.requestDescription, styles.rowText]}>
            <Text style={{ fontWeight: '700' }}>Looking for: </Text>
            <Text>{offer.request.description}</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowText: {
    marginBottom: '2%',
  },
  detailsContainer: {
    width: '85%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  trashCanContainer: {
    width: '15%',
    opacity: 0.8,
  },
  offerDescription: {
    color: blue,
    fontWeight: '300',
    fontSize: 17,
  },
  category: {
    color: yellow,
    fontSize: 12,
    fontWeight: '900',
  },
  requestDescription: {
    color: blue,
    opacity: 0.75,
    fontSize: 12,
  },
  upperContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
});
