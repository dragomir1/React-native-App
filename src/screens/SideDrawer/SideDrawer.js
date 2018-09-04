import React, { Component } from 'react';
import { View, Text } from 'react-native';


// yu register your side drawer in the startMainTabs becuase side drawer is part of the main tabs...in the documentation.
//  make sure you register it as a screen.

class Sidedrawer extends Component {
  render() {
    return (
      <View>
        <Text>
        Sidedrawer
        </Text>
      </View>
    );
  };
}

export default Sidedrawer;
