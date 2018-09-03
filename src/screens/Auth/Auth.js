import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';



class Authscreen extends Component {
  loginButtonHandler = () => {
    startMainTabs();
  }
  render() {
    return (
      <View>
        <Text> Auth Screen</Text>
        <Button title="Login" onPress={this.loginButtonHandler} />
      </View>
    );
  }
}

export default Authscreen;
