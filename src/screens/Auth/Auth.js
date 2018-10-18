import React, { Component } from 'react';
import { View,
         Text,
         Button,
         TextInput,
         StyleSheet,
         ImageBackground,
         // This API finds out which dimesnions the current window has. it has two useful tools: the get() gets the width and height of the current window or the screen and the listen() listens to dimension changes...ex. when user rotates device. we then can add an event listener to the chenge event on the api.
         Dimensions,
        // this works with the keyboard to push the screen up when the keyboard is active.
        KeyboardAvoidingView,
        // this dismisses the keyboard when clicked anywhere on app.
        Keyboard,
        // this enables your screen to to active to input
        TouchableWithoutFeedback
      } from 'react-native';
import { connect } from 'react-redux';
import StartMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import {tryAuth} from '../../store/actions/index';

  // MANAGING INPUT/CONTROL STATE:
  // WE NEED TO CONNECT ALL THE INPUTS IN THE JSX CODE TO SOME OBJECT WE CAN MANAGE IN THE STATE SO THAT WE CAN:
    // 1) BIND THE VALUE TO SET UP TWO WAY BINDING SO THAT WE ALWAYS STORE WHAT THE USER ENTERS IN THE STATE.
    // 2) CHECK THE VALIDITY AND CONTROL THE VALIDITY OF THE INPUT.
    // 3) AND THAT WE CAN USE THIS information TO CHANGE THE STYLING OF THE INPUTS AND TO DISABLE THE BUTTONS IF THE INPUTS ARE INVALID.



class Authscreen extends Component {

  // we need state to update the state to change something in the UI.  These are defaults
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    authMode: 'Login',
    // we could use redux for this BUT  THE STATE WE'RE HADNLING HERE IS JUST THE INTERNAL STATE OF THIS SPECIFIC SCREEN OF THIS Component.  THERE IS NO ADVATAGE OF PUTTING THIS IN REDUX BECAUASE THERE IS NO OTHER PLACE N THE APPLICATION CARES ABOUT THIS STATE.

    // each key should hold a JS object as it's value where we store the current value and it's validity.
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true,
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 8,
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          // this needs match the password key above.
          equalTo: 'password'
        },
        touched: false
    }
    // responsiveStyles: {
    //   pwContainerDirection: "column",
    //   pwContainerJustifyContent: "flex-start",
    //   pwWrapperWidth: "100%"
    // }
  }
  };
  // =============================================================================
  //  adding a constructor so we can adjust the styles Dynamically.
  // THIS HANDLES TH MEMEORY LEAK. SO WHEN WE ADD TH EVENT LISTER AT THR BEGINING WE NEED TO DISCONNECT IT.  ALL THIS CODE AT THE BOTTOM FIXES THE MEMORY LEAK.
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  switchAuthModeHandler = () => {
    // create a toggle function so we need to know the previous state
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? "signup" : "login"
      }
    })
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    })
  }

  // =================================================================================
  loginButtonHandler = () => {
    // once users hit the submit button we want to submit this to some server and store it there.
    // to set this up we need to set up a auth dispatch.
      // 1.add an actiontype
      // 2.create a new file in actions folder called auth.js
      // 3

// we need to pass the authData here.
const authData = {
  email: this.state.controls.email.value,
  password: this.state.controls.value
}

    this.props.onLogin(authData);
    StartMainTabs();
  }
// we set state on the controls..but not all of the controls.  just the key we're updating.  so we need to use the prevState syntax where we pass it to a funtion where we then return an that should be merged with the state.
  updateInputState = (key, value) => {
    // this checks if we have the equalTo rule.  which in this case is 'password'
    // the idea behind this code of getting the value of the equalControl =>
    //
    let connectedValue = {};
    if(this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if(key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }


    this.setState(prevState => {
      return {
        // we need to update prevState so that when we update email, we dont' lose password and confirm password. we set the value to the value we get as an argument. within the controls we have the validation rules as well as the valid properites.  we also need to not lose those when we update.  we are distributing all the prevState control information for that specific key => ...prevState.controls[key], for that control we are accessing.
        // this entire code only updates the value of the value property and we are maintaining all the prevState info of the other properties. so we are keeping the valid and the validationRules in place.
        controls: {
          ...prevState.controls,
          // this code is when the password and confirmPassword are true and equal, BUT if you type extra cheatacters in the password field, it will still be equal.  this sets it to false if you add more characters to password..
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
            : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true
          }
        }
      };
    });
  }
  // the main components you can style are view and text.  you can style the view with flexbox
// <DefaultInput placeholder="Password" style={[styles.input, {borderColor: "red"}]} /> => is an example of how you can combine styling elements from the outside with the default styleing elements through props.
  render() {
// this is checking for the dimenions of andriod.
    let headingText = null;
    let confirmPasswordControl = null;
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={styles.headerText}>Please Log In</HeadingText>
        </MainText>
      );
    }

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View style={this.state.viewMode === "portrait"
          ? styles.portraitPasswordWrapper
          : styles.landscapePasswordWrapper
        }>
        <DefaultInput
          placeholder="Confirm Passoword"
          style={styles.input}
          value={this.state.controls.confirmPassword.value}
          onChangeText={(val) => this.updateInputState('confirmPassword', val)}
          valid={this.state.controls.confirmPassword.valid}
          touched={this.state.controls.confirmPassword.touched}
          secureTextEntry />
        </View>
      );
    }

    return (
      <ImageBackground
        source={backgroundImage} style={styles.imageBackground} >
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          {headingText}
          <ButtonWithBackground
            color="#29aaf4"
            onPressButton={this.switchAuthModeHandler}>
              Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Email"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={(val) => this.updateInputState('email', val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType="email-address"
              />

            <View style={this.state.viewMode === "portrait" || this.state.authMode === "login"
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer
              }>
                <View style={this.state.viewMode === "portrait" || this.state.authMode === "login"
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }>
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={(val) => this.updateInputState('password', val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  secureTextEntry />
                </View>
                {confirmPasswordControl}
              </View>
          </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground
            color="#29aaf4"
            onPressButton={this.loginButtonHandler}
            disabled={
              !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup'
              || !this.state.controls.password.valid
              || !this.state.controls.email.valid}>
            Submit
          </ButtonWithBackground>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#b3e6b3"
  },
  imageBackground: {
    width: "100%",
    flex: 1,
  },
  inputContainer: {
    width: "80%"
  },
  headerText: {
    // textDecorationLine: "underline"
  },
  // these lines of code are for a better responsive solution.
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%",
  },
  portraitPasswordWrapper: {
    width: "100%",
  },
  input: {
    backgroundColor: "#ccccff",
    borderColor: "#000"
  }
});

const mapDispatchToProps = dispatch => {
return {
  onLogin: (authData) => dispatch(tryAuth(authData))
};
}
export default connect(null, mapDispatchToProps)(Authscreen);
