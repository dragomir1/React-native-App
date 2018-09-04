import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput  from '../../components/UI/DefaultInput/DefaultInput';



class Authscreen extends Component {
  loginButtonHandler = () => {
    startMainTabs();
  }

  // the main components you can style are view and text.  you can style the view with flexbox
  render() {
    return (
      <View style={styles.container}>
        <Text>Please Log In</Text>
        <Button title="Switch to Login" />
        <View style={styles.inputContainer}>
          <DefaultInput placeholder="Email" />
          <DefaultInput placeholder="Password" />
          <DefaultInput placeholder="Confirm Passoword" />
        </View>

        <Button title="Submit" onPress={this.loginButtonHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  }
});

export default Authscreen;
