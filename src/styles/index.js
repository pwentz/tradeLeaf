import {
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native'

export const onAndroid = Platform.select({
  ios: false,
  android: true
})

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const blue = '#27496B';
export const yellow = '#DFBA00';
export const midGray = '#B8B8B8';
export const lightWhite = '#F9F9F9';
export const darkWhite = '#F5F5F5';


const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: midGray,
    height: 40,
    width: 180,
    textAlign: 'center'
  },
  liteInput: {
    marginTop: 15,
    height: 40,
    width: (windowWidth * 0.75),
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    color: blue
  },
  actionButton: {
    marginTop: 15,
    borderRadius: 25,
    height: 40,
    width: 140,
    backgroundColor: yellow,
    overflow: 'hidden'
  },
  actionButtonWide: {
    borderRadius: 25,
    height: 40,
    width: (windowWidth * 0.75),
    backgroundColor: yellow,
    overflow: 'hidden'
  },
  actionButtonText: {
    color: darkWhite,
    textAlign: 'center',
    marginTop: 10
  },
  errorText: {
    fontSize: 15,
    color: darkWhite,
    textAlign: 'center',
    backgroundColor: '#e26262',
    alignSelf: 'stretch'
  },
  overlay: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: lightWhite
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  secondaryButton: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: midGray
  },
  iconCircleContainer: {
    borderRadius: 80,
    overflow: 'hidden',
    margin: 1
  }
})

export default styles
