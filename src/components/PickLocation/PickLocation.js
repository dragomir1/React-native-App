import React, { Component } from 'react';
import { View, Image, Button, StyleSheet, Dimensions} from 'react-native';
// import backgroundImage from '../../assets/background.jpg';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width /
      Dimensions.get('window').height *
      0.0122,
    },
    chosenLocation: false,
  }

// this entire block of code is to pick a location on the map.
   pickLocationHandler = event => {
      const coords = event.nativeEvent.coordinate;
      // calling this.map property we created below. animateToRegion needs a JS object to configure the region.
      // aniamateToRegion takes two arguments. region and duration.
      this.map.animateToRegion({
        // region
        ...this.state.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude

      });
      this.setState(prevState => {
          return {
            focusedLocation: {
              ...prevState.focusedLocation,
              latitude: coords.latitude,
              longitude: coords.longitude
            },
            chosenLocation: true,
          };
      });
      // WE NEED TO EXECUTE THE onLocationPick PROP TO EXECUTE THE METHOD.  WE WANT TO DO THAT WHENEVER A LOCATION IS SET EITHER BY LOCATING THE USER OR CLICKING ON THE MAP, pickLocationHandler IS CALLED.

      // with this code we propagate the data by getting the data out of the PickLocation component into the sharePlace component
      this.props.onLocationPick({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
   };
// the focusedLocation is bound to the initialRegion and wont update after the first render. we use region to update the focusedLocation that will update after the first render.

// with animation, we need to call a method on the MapView Component. WE USE A REACT CONCEPT CALLED "REF".  we get a reference to the underlying object and use that in our other JS code. we do an arrow function and we bind some property of our class to this reference.  you access the class with the "this" keyword.
    // ref={ref => this.map = ref} this is the syntax for the ref concept. you access it with "this" then you name it whatever you want.  in this case, it's "map". and assign it to the ref.  so this creates a property in your class => "this.map" with holds a reference to the the mapView object.
    // now we can use it in our code.


    getLocationHandler = () => {
      // this gives us access to the geolocation object and this method on the navigator object.  the method takes two arguments: 1. a success function. this function is executed when we successfully fetched the position and 2. an arrow function will be exectued if the posititon failed.
      navigator.geolocation.getCurrentPosition(pos => {
        // here we can use the pickLocationHandler() method but to really be able to use this we need to pass an object that has the nativeEvent proptery which holds a coordinate property.
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
    err => {
      console.log(err);
      alert("fetching position failed.")
    })
    }


  render() {
    let marker = null;

    if(this.state.chosenLocation) {
      marker = <Marker coordinate={this.state.focusedLocation} />
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
          >
          {marker}
        </MapView>
      <View style={styles.button}>
        <Button title="Locate me" onPress={this.getLocationHandler} />
      </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "95%",
    height: 250,
    borderWidth: 1,
    borderColor: "black",


  },
  button: {
    margin: 8
  },
  imagePreview: {
    width: "100%",
    height: "100%"
  }
});

export default PickLocation;
