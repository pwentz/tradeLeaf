import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';

import globalStyles, { onAndroid, midGray } from '../../styles/index';

export default class RegisterForm extends Component {
  static propTypes = {
    onSubmitRegister: PropTypes.func.isRequired,
    backToLogin: PropTypes.func.isRequired,
    apiError: PropTypes.string
  };

  static defaultProps = {
    logoHeader1: require('../../images/tradeLeafHeader1.png'),
    logoHeader2: require('../../images/tradeLeafHeader2.png')
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordConfirmation: ""
    };
  };

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

  onSubmitRegister = () => {
    const { username, password, passwordConfirmation } = this.state;
    this.handleFocus(0);
    this.props.onSubmitRegister(username, password, passwordConfirmation);
  };

  render() {
    return (
      <View style={globalStyles.overlay}>

        {!!this.props.apiError &&
          <Text style={globalStyles.errorText}>
            {this.props.apiError}
          </Text>
        }

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
              returnKeyType='next'
              secureTextEntry={true}
              onChangeText={ text => this.setState({ password: text }) }
              value={this.state.password}
              blurOnSubmit={!onAndroid}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TextInput
              style={globalStyles.input}
              ref='input_2'
              onFocus={() => this.handleFocus(2)}
              onSubmitEditing={this.onSubmitLogin}
              returnKeyType='go'
              secureTextEntry={true}
              onChangeText={ text => this.setState({ passwordConfirmation: text }) }
              value={this.state.passwordConfirmation}
              blurOnSubmit={!onAndroid}
              autoCapitalize='none'
              autoCorrect={false}
            />

          <TouchableHighlight
            style={globalStyles.actionButton}
            onPress={this.onSubmitRegister}
          >
            <Text style={globalStyles.actionButtonText}>
              register
            </Text>
          </TouchableHighlight>


          <TouchableHighlight
            style={globalStyles.actionButton}
            onPress={this.props.backToLogin}
          >
            <Text style={globalStyles.actionButtonText}>
              back to login
            </Text>
          </TouchableHighlight>
        </ScrollView>

      </View>
    );
  };
};
