import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import UserInput from '../../components/UserInput/UserInput';
import { addPlace } from '../../store/actions/index';
// import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';

class SharePlaceScreen extends Component {


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


  placeAddHandler = placeName => {
    this.props.onAddPlace(placeName);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <MainText><HeadingText>Share a place with us</HeadingText></MainText>
        <View style={styles.placeholder}>
          <Image source={backgroundImage} style={styles.imagePreview} />
        </View>
        <View style={styles.button}>
          <Button title="pick image" />
        </View>
        <View style={styles.placeholder}>
          <Image source={backgroundImage} style={styles.imagePreview} />
        </View>
        <View style={styles.button}>
          <Button title="Locate me" />
        </View>
        <UserInput />
        <View style={styles.button}>
          <Button title="Share the place" />
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
