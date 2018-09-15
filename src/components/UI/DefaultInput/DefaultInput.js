import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// to merge the default styles but also add seperate styling elements while keeping the default styling..you add an array and can add as many styling inputs as you want from outside
const defaultInput = props => (
  <TextInput
    underlineColorAnroid="transparent"
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid: null]} />

);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: 'red',



  }
});
export default defaultInput;
