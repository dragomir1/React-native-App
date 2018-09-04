import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


const defaultInput = props => (
  <TextInput
    style={styles.input}
    underlineColorAnroid="transparent"
    {...props} />

);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    margin: 10
  }
});
export default defaultInput;
