import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// we import view so we can further style it. we're limited to styling eith the other components.
const buttonWithBackground = props => (
  <TouchableOpacity onPress={props.onPressButton}>
    <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]}>
      <Text style={props.disabled ? styles.disabledText : null}>{props.children}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa'
  },
  disabledText: {
    color: '#aaa'
  }
});
export default buttonWithBackground;
