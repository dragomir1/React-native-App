import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';
import UserInput from '../../components/UserInput/UserInput';
import { addPlace } from '../../store/actions/index';

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
      <View>
        <UserInput onPlaceAdded={this.placeAddHandler} />
      </View>
    );
  }
}


const mapDispachToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName)),
  };
};
export default connect(null, mapDispachToProps)(SharePlaceScreen);
