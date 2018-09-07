import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import UserInput from '../../components/UserInput/UserInput';
import { addPlace } from '../../store/actions/index';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';


class SharePlaceScreen extends Component {

  // this is to connect userInput to generate new places.  By default its' an empty string
  state = {
    placeName: ""
  }


// when working with RN navigation, we need events to open the side drawer. to set those up we need to add constructors. we need to listen to and even by setting up a listener.
  constructor(props) {
    super(props);
    // this.props.navigator.setOnNavigatorEvent() => this specifies a method that should be executed whenever some navigation event occurs
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  // adding event listener METHOD
  onNavigatorEvent = event => {
    console.log(event);
    if(event.type === "NavBarButtonPress") {
      if(event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }

  onChangeTextHandler = value => {
    this.setState({placeName: value});

  }

  placeAddHandler = placeName => {
    if(this.state.placeName.trim() !== "") {
      this.props.onAddPlace(this.state.placeName);
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <MainText>
          <HeadingText>Share a place with us</HeadingText>
        </MainText>
        <PickImage />
        <PickLocation />
        <UserInput
          placeName={this.state.placeName}
          onChangeText={this.onChangeTextHandler} />
        <View style={styles.button}>
          <Button
            title="Share the place"
            onPress={this.placeAddHandler} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    margin: 8
  },
  imagePreview: {
    width: "100%",
    height: "100%"
  }
});

const mapDispachToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName)),
  };
};
export default connect(null, mapDispachToProps)(SharePlaceScreen);
