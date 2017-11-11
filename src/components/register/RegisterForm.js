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

import globalStyles, {
  onAndroid,
  midGray,
  darkWhite,
  windowWidth
} from '../../styles/index';

export default class RegisterForm extends Component {
  static propTypes = {
    onSubmitRegister: PropTypes.func.isRequired,
    backToLogin: PropTypes.func.isRequired,
    apiError: PropTypes.string
  };

  static defaultProps = {
    logoHeader1: require('../../images/tradeLeafHeader1.png')
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: "first name",
      lastName: "last name",
      email: "email",
      username: "username",
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

        <View style={{height:35}}></View>

        <View style={styles.loginButtonContainer}>
          <TouchableHighlight
            style={[globalStyles.secondaryButton]}
            onPress={this.props.backToLogin}
          >
            <Text style={styles.loginButtonText}>
              log in
            </Text>
          </TouchableHighlight>
        </View>

        <View style={globalStyles.scrollContainer}>

          <Image
            source={this.props.logoHeader1}
          />
          <View style={{height:20}}></View>

          <ScrollView
            contentContainerStyle={globalStyles.container}
            ref='scrollView'
            keyboardDismissMode='on-drag'
          >
            <TextInput
              style={globalStyles.liteInput}
              ref='input_0'
              onFocus={() => this.handleFocus(0)}
              onSubmitEditing={() => this.handleNext(1)}
              returnKeyType='next'
              value={this.state.firstName}
              onChangeText={ text => this.setState({ firstName: text }) }
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TextInput
              style={globalStyles.liteInput}
              ref='input_1'
              onFocus={() => this.handleFocus(1)}
              onSubmitEditing={() => this.handleNext(2)}
              returnKeyType='next'
              value={this.state.lastName}
              onChangeText={ text => this.setState({ lastName: text }) }
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TextInput
              style={globalStyles.liteInput}
              ref='input_2'
              onFocus={() => this.handleFocus(2)}
              onSubmitEditing={() => this.handleNext(3)}
              returnKeyType='next'
              value={this.state.email}
              onChangeText={ text => this.setState({ email: text }) }
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TextInput
              style={globalStyles.liteInput}
              ref='input_3'
              onFocus={() => this.handleFocus(3)}
              onSubmitEditing={() => this.handleNext(4)}
              returnKeyType='next'
              value={this.state.username}
              onChangeText={ text => this.setState({ username: text }) }
              autoCapitalize='none'
              autoCorrect={false}
            />
            <TextInput
              style={globalStyles.liteInput}
              ref='input_4'
              onFocus={() => this.handleFocus(4)}
              onSubmitEditing={() => this.handleNext(5)}
              returnKeyType='next'
              secureTextEntry={true}
              onChangeText={ text => this.setState({ password: text }) }
              value={this.state.password}
              blurOnSubmit={!onAndroid}
              autoCapitalize='none'
              autoCorrect={false}
              defaultValue='password'
            />
            <TextInput
              style={globalStyles.liteInput}
              ref='input_5'
              onFocus={() => this.handleFocus(5)}
              onSubmitEditing={this.onSubmitLogin}
              returnKeyType='go'
              secureTextEntry={true}
              onChangeText={ text => this.setState({ passwordConfirmation: text }) }
              value={this.state.passwordConfirmation}
              blurOnSubmit={!onAndroid}
              autoCapitalize='none'
              autoCorrect={false}
              defaultValue='confirm password'
            />

            <TouchableHighlight
              style={[globalStyles.actionButtonWide, {marginTop: 30}]}
              onPress={this.onSubmitRegister}
            >
              <Text style={styles.wideButtonText}>
                get started
              </Text>
            </TouchableHighlight>


          </ScrollView>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  loginButtonText: {
    color: midGray,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 10
  },
  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 25,
    marginBottom: 25
  },
  wideButtonText: {
    color: darkWhite,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18
  }
})
