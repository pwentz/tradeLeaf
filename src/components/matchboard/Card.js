import React, { Component} from 'react';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Octicons';
import LightboxImage from '../common/LightboxImage';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import { secureImageSource } from '../../api/utils';

import globalStyles, {
  darkWhite,
  midGray,
  yellow,
  blue,
  windowWidth,
  windowHeight
} from '../../styles/index'

import Avatar from '../common/Avatar';

export default class Card extends Component {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    offer: PropTypes.object.isRequired,
    distance: PropTypes.number.isRequired,
    onLightboxOpen: PropTypes.func,
    onLightboxClose: PropTypes.func,
    apiError: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      imageBlur: 10
    }
  }

  render() {
    const { user, offer, onAccept, onDecline, distance, apiError, inProgress,
            onLightboxOpen, onLightboxClose } = this.props;
    const userPhoto = user.photo ? { uri: user.photo.imageUrl } : undefined
    const milesAway = distance <= 0 ? '∞' : String(distance)

    return (
      <View style={globalStyles.container}>
        {!!apiError &&
          <Text style={globalStyles.errorText}>
            {apiError}
          </Text>
        }

        <View style={{height: 20}}></View>
        <View style={styles.cardContainer}>

          <View style={styles.userContainer}>
            <Avatar
              size={90}
              imageSource={userPhoto}
            />

            <View style={styles.userDataContainer}>
              <Text>
                {'@' + user.username}
              </Text>
              <Text>
                Simple Logo
              </Text>
              <Text>
                {milesAway} miles away
              </Text>
            </View>
          </View>

          <View style={styles.tradeContainer}>
            <View style={styles.offerDetails}>
              <Text>
                offer:
              </Text>
              <Text>
                {offer.description}
              </Text>

              <View style={styles.offerImageContainer}>
                <LightboxImage
                  onOpen={onLightboxOpen}
                  onClose={onLightboxClose}
                  swipeToDismiss={false}
                >
                  <Image
                    source={secureImageSource({uri: offer.photo.imageUrl})}
                    style={styles.offerImage}
                    blurRadius={this.state.imageBlur}
                    onLoadEnd={() => this.setState({imageBlur: 0})}
                  />
                </LightboxImage>
              </View>

            </View>
            <View style={styles.needContainer}>
              <Text>
                need:
              </Text>
              <Text>
                {offer.request.description}
              </Text>
            </View>
          </View>

          <View style={styles.cardActionContainer}>

            <View style={styles.mailIconContainer}>
              <TouchableOpacity>
                <Icon
                  name='mail'
                  size={38}
                  color={midGray}
                >
                </Icon>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.mainButton}
              onPress={onAccept}
            ></TouchableOpacity>

            <View style={styles.xIconContainer}>
              <TouchableOpacity onPress={onDecline}>
                <Icon
                  name='x'
                  size={38}
                  color={blue}
                >
                </Icon>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: (windowHeight * 0.7),
    width: (windowWidth * 0.85),
    backgroundColor: darkWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: midGray,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  cardActionContainer: {
    height: '14.3%',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: midGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainButton: {
    height: 42,
    width: 42,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: yellow
  },
  xIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 20
  },
  mailIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 20
  },
  tradeContainer: {
    width: '75%',
    height: '58.5%',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  needContainer: {
    width: '100%',
    height: '34%',
    borderTopWidth: 1,
    borderTopColor: midGray,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '82%'
  },
  userDataContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 0.85
  },
  offerDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '66%'
  },
  offerImageContainer: {
    width: '100%',
    height: '45%',
    overflow: 'hidden',
    marginBottom: 5
  },
  offerImage: {
    width: '100%',
    aspectRatio: 2,
    alignSelf: 'center'
  }
});
