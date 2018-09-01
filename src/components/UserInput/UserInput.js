import React, { Component } from 'react';

import { View, StyleSheet, Text, Button, TextInput } from 'react-native';



// here we are adding the TextInput to register user input.  onChangeText is the prop name that reads the user input.
// in the simulator, the botton sits on the bottom of the text, but we want to position it next to each other.
// RN only emulates CSS.  it doesnt offer the same properties or complexitites as css. your only real choices are to create flex elements or not showing them at all. so you can set display to 'flex' or 'none'.

// the solution is to create a nested view that will also recieve some flex styling.  the overall container covers the whole page, and aligns elements from top to bottom.
// the first element is another view to position it's child elements in a row.


// in the view below the secondary view, we want to render some text elements where we output the placenames stored in the array.
//  we need to do some code in the render function.  MAP is the the default logic for outputting arrays in react.
// we use 'i' to place it in a key since we dont really have a unique identifer, we just pass i to be used as the key value in our text element. not the best solution but we dont have any unique id.

class userInput extends Component {
  // reistering state so that we can use two-way binding to store the user input.
    state = {
      placeName: ''
    };

    // handling changes to the input
      placeNameChangedHandler = val => {
        this.setState({
          placeName: val
        });
      };

      placeSubmitHandler = () => {
        if(this.state.placeName.trim() === "") {
          return;
        }
        this.props.onPlaceAdded(this.state.placeName);
      };

  render () {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          placeholder="enter the awesome place"
          style={styles.placeInput} />
        <Button
          title="add"
          style={styles.placeButton}
          onPress={this.placeSubmitHandler} />
      </View>
    );
  }
}

// this is the format for when creating styling for your elements.
const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    // this takes the full avail width it has. the difference between this and flex: 1 is that it will not take the full space from top to bottom..just from left to right.
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  }
});

export default userInput;
