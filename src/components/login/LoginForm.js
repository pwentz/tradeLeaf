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

import globalStyles, { onAndroid } from '../../styles/index'

class LoginForm extends Component {
  static propTypes = {
    onSubmitLogin: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  handleFocus = (inputIdx) => {
    if (this.refs.scrollView) {
      const input = this.refs['input_' + inputIdx];
      if (input) {
        input.measure((fx, fy, width, height, px, py) => {
          this.refs.scrollView.scrollTo({ y: fy, x: 0, animated: true });
        });
      };
    };
  };

  handleNext = (inputIdx) => {
    const input = this.refs['input_' + inputIdx];
    if (input) {
      input.focus();
    };
  };

  onSubmitLogin = () => {
    const { username, password } = this.state
    this.handleFocus(0)
    this.props.onSubmitLogin(username, password)
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        ref='scrollView'
        keyboardDismissMode='on-drag'
      >
        <TextInput
          style={globalStyles.input}
          ref='input_0'
          onFocus={() => this.handleFocus(0)}
          onSubmitEditing={() => this.handleNext(1)}
          returnKeyType='next'
          value={this.state.username}
          onChangeText={ text => this.setState({ username: text }) }
        />
        <TextInput
          style={globalStyles.input}
          ref='input_1'
          onFocus={() => this.handleFocus(1)}
          onSubmitEditing={this.onSubmitLogin}
          returnKeyType='go'
          secureTextEntry={true}
          onChangeText={ text => this.setState({ password: text }) }
          value={this.state.password}
          blurOnSubmit={!onAndroid}
        />
        <TouchableHighlight
          style={globalStyles.actionButton}
          onPress={this.onSubmitLogin}
        >
          <Text style={globalStyles.actionButtonText}>
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
  forgotPassword: {
    color: '#e7e1e1',
    fontSize: 10
  }
})

export default LoginForm
