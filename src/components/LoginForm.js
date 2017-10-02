import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native'

export default class LoginForm extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
        />
        <TextInput
          style={styles.input}
        />
        <TouchableHighlight style={styles.loginButton}>
          <Text style={styles.buttonText}>
            sign in
          </Text>
        </TouchableHighlight>
        <TouchableOpacity style={{marginTop: 10}}>
          <Text style={styles.forgotPassword}>
            forgot your password?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: '#e7e1e1',
    height: 40,
    width: 180
  },
  loginButton: {
    marginTop: 15,
    borderRadius: 25,
    height: 40,
    width: 140,
    backgroundColor: '#DBC81D',
    overflow: 'hidden'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  },
  forgotPassword: {
    color: '#e7e1e1',
    fontSize: 10
  }
})
