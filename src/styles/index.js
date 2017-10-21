import {
  Platform,
  StyleSheet
} from 'react-native'

export const onAndroid = Platform.select({
  ios: false,
  android: true
})

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: '#e7e1e1',
    height: 40,
    width: 180,
    textAlign: 'center'
  },
  actionButton: {
    marginTop: 15,
    borderRadius: 25,
    height: 40,
    width: 140,
    backgroundColor: '#DBC81D',
    overflow: 'hidden'
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  },
  errorText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#e26262',
    alignSelf: 'stretch'
  }
})

export default styles
