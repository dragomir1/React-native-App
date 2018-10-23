import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import {connect} from 'react-redux';
import UserInput from '../../components/UserInput/UserInput';
import {addPlace} from '../../store/actions/index';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {

  // we are styling menu button.    WE DO THIS IN THE COMPONENTS WHERE WE CONTROL THAT BUTTON.
  // STATIC PROPERTY CAN BE ACCESSED WITHOUT BEING INSTANTIATED.
  static navigatorStyle = {
    navBarButtonColor: "#009933"
  }

  // this is to connect userInput to generate new places.  By default its' an empty string
  // we are setting up to check and validate that the user input is not empty.
  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    }
  };

  // when working with RN navigation, we need events to open the side drawer. to set those up we need to add constructors. we need to listen to and even by setting up a listener.
  constructor(props) {
    super(props);
    // this.props.navigator.setOnNavigatorEvent() => this specifies a method that should be executed whenever some navigation event occurs
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  // adding event listener METHOD
  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({side: "left"});
      }
    }
  }
//  we are checking and validating the input. so if it's empty the button will be disabled.
  onChangeTextHandler = value => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: value,
            valid: validate(value, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    });
  }

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  }


  locationPickHandler = location => {
    this.setState(prevState=>{
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  }

  placeAddHandler = placeName => {
      this.props.onAddPlace(
        this.state.controls.placeName.value,
        this.state.controls.location.value,
        this.state.controls.image.value);
  };

  render() {
    return (<ScrollView contentContainerStyle={styles.container}>
      <MainText>
        <HeadingText>Share a place with us</HeadingText>
      </MainText>
      <PickImage onImagePicked={this.imagePickedHandler} />
      <PickLocation
        onLocationPick={this.locationPickHandler} />
      <UserInput
        placeData={this.state.controls.placeName}
        onChangeText={this.onChangeTextHandler} />
      <View style={styles.button}>
        <Button
          title="Share the place"
          onPress={this.placeAddHandler}
          disabled={!this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid} />
      </View>
    </ScrollView>);
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
    onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
  };
};
export default connect(null, mapDispachToProps)(SharePlaceScreen);
