import React, { Component } from 'react';
import { View,
         Text,
         Button,
         TextInput,
         StyleSheet,
         ImageBackground,
         // This API finds out which dimesnions the current window has. it has two useful tools: the get() gets the width and height of the current window or the screen and the listen() listens to dimension changes...ex. when user rotates device. we then can add an event listener to the chenge event on the api.
         Dimensions }
         from 'react-native';
import StartMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';



class Authscreen extends Component {

  // we need state to update the state to change something in the UI.  These are defaults
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    // responsiveStyles: {
    //   pwContainerDirection: "column",
    //   pwContainerJustifyContent: "flex-start",
    //   pwWrapperWidth: "100%"
    // }
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

  updateStyles = (dims) => {
    this.setState({
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    })
  }

  // =================================================================================
  loginButtonHandler = () => {
    StartMainTabs();
  }


  // the main components you can style are view and text.  you can style the view with flexbox
// <DefaultInput placeholder="Password" style={[styles.input, {borderColor: "red"}]} /> => is an example of how you can combine styling elements from the outside with the default styleing elements through props.
  render() {
// this is checking for the dimenions of andriod.
    let headingText = null;
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={styles.headerText}>Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground
        source={backgroundImage} style={styles.imageBackground} >
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPressButton={() => alert('hi')}>Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Email" style={styles.input} />
              <View style={this.state.viewMode === "portrait"
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer
              }>
                <View style={this.state.viewMode === "portrait"
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }>
                <DefaultInput placeholder="Password" style={[styles.input, {borderColor: "red"}]} />
                </View>
                <View style={this.state.viewMode === "portrait"
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }>
                <DefaultInput placeholder="Confirm Passoword" style={styles.input} />
                </View>
              </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPressButton={this.loginButtonHandler}>Submit</ButtonWithBackground>
        </View>
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

export default Authscreen;
