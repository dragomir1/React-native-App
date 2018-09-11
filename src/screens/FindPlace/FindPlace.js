import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated
 } from 'react-native';

// we need to render all of our places.  so we need access to the store to get the places.
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
// import PlaceDetail from '../PlaceDetail/PlaceDetail';


class FindPlaceScreen extends Component {
// here, we are setting state so we can dtermine if data has been loaded. if not we want to display a button.

// WE CONTROL ANIMATION VALUES IN THE STATE.
// .Value is value we can use on a styling peoperty. this is managed automatically by react
// you pass a value that is the value when initialzing.
  state = {
    placesLoaded: false,
    removeAnimation: new Animated.Value(1),
    addAnimation: new Animated.Value(0)
  };

  // we are styling menu button.    WE DO THIS IN THE COMPONENTS WHERE WE CONTROL THAT BUTTON.
  // STATIC PROPERTY CAN BE ACCESSED WITHOUT BEING INSTANTIATED.
  static navigatorStyle = {
    navBarButtonColor: "#009933"
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress") {
      if(event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }
// this starts the animation process.  here we start animation then switch the state to false once animation is done.
// timing() defines the span of time over which the animation will occur.
// we pass a value that react should change automatically as the first argument
// the second argument configures the animation you want to play.  you add "toValue": the value you want to animate to. we started at 1 and we are animating to 0
// useNativeDriver: true hook into the native driver which is more perfomant that running it through JS
  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.addAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };


  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigator.push({
      screen: "awesomePlaces.PlaceDetailScreen",
      title: selPlace.name,
      // passing information into the upcoming screen.  use this property
      passProps: {
        selectedPlace: selPlace
      }
    });
  };

  render() {
    // this is to be displayed if we have no data. to determine if we have no data, we need to add state.  if we have no data we load this button

    //  interpolate allows you to use the value that is managed by react which in this case moves 1 to 0 and converts it to a different value for the scale property only. you need an input and an output range
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnimation,
          transform: [
            {
              scale: this.state.removeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [10,1]
              })
            }
          ]
        }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if(this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.addAnimation,
          }}>
          <PlaceList places={this.props.places}
            onItemSelected={this.itemSelectedHandler} />
        </Animated.View>
      );
    }

    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchButton: {
    borderColor: "blue",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 26
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
// we need access to the store to get the places from redux.
const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
