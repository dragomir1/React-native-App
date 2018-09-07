import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// yu register your side drawer in the startMainTabs becuase side drawer is part of the main tabs...in the documentation.
//  make sure you register it as a screen.

class Sidedrawer extends Component {
  render() {
    return (
      <View style={[
          styles.container,
          {width: Dimensions.get('window').width * 0.8}
        ]}>
        <TouchableOpacity>
          <View style={styles.drawerItem}>
            <Icon name="ios-log-out" size={30} color="#000" style={styles.drawerItemIcon}/>
            <Text>Signout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});



export default Sidedrawer;
