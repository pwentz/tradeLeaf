import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native'

import globalStyles, { onAndroid, midGray } from '../../styles/index'

class LoginForm extends Component {
  static propTypes = {
    onSubmitLogin: PropTypes.func.isRequired,
    apiError: PropTypes.string
  }

  static defaultProps = {
    logoHeader1: require('../../images/tradeLeafHeader1.png'),
    logoHeader2: require('../../images/tradeLeafHeader2.png')
  };

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
      <View style={globalStyles.overlay}>

        {!!this.props.apiError &&
          <Text style={globalStyles.errorText}>
            {this.props.apiError}
          </Text>
        }

        <View style={styles.filler}></View>
        <View style={globalStyles.scrollContainer}>
          <Image
            source={this.props.logoHeader1}
          />
          <Image
            source={this.props.logoHeader2}
            style={styles.logoHeader2}
          />
          <View style={{height: 70}}></View>
          <ScrollView
            contentContainerStyle={globalStyles.container}
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
              autoCapitalize='none'
              autoCorrect={false}
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
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TouchableHighlight
              style={globalStyles.actionButton}
              onPress={this.onSubmitLogin}
            >
              <Text style={globalStyles.actionButtonText}>
                sign in
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[globalStyles.actionButton, {marginTop: 10}]}
              onPress={this.props.navigateToRegister}
            >
              <Text style={globalStyles.actionButtonText}>
                create account
              </Text>
            </TouchableHighlight>

            <TouchableOpacity style={{marginTop: 10}}>
              <Text style={styles.forgotPassword}>
                forgot your password?
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  forgotPassword: {
    color: midGray,
    fontSize: 10
  },
  filler: {
    height: 140
  },
  logoHeader2: {
    marginTop: 15,
    marginLeft: 70
  }
});

export default LoginForm
