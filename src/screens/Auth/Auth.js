import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import StartMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';



class Authscreen extends Component {
  loginButtonHandler = () => {
    StartMainTabs();
  }


  // the main components you can style are view and text.  you can style the view with flexbox
// <DefaultInput placeholder="Password" style={[styles.input, {borderColor: "red"}]} /> => is an example of how you can combine styling elements from the outside with the default styleing elements through props.
  render() {
    return (
      <ImageBackground
        source={backgroundImage} style={styles.imageBackground} >
        <View style={styles.container}>
          <MainText>
            <HeadingText style={styles.headerText}>Please Log In</HeadingText>
          </MainText>
          <ButtonWithBackground color="#29aaf4" onPressButton={() => alert('hi')}>Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Email" style={styles.input} />
            <DefaultInput placeholder="Password" style={[styles.input, {borderColor: "red"}]} />
            <DefaultInput placeholder="Confirm Passoword" style={styles.input} />
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
  input: {
    backgroundColor: "#ccccff",
    borderColor: "#000"
  }
});

export default Authscreen;
