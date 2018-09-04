import React, { Component } from 'react';
import { View, Text} from 'react-native';

// we need to render all of our places.  so we need access to the store to get the places.
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
// import PlaceDetail from '../PlaceDetail/PlaceDetail';


class FindPlaceScreen extends Component {

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

    return (
      <View>
        <PlaceList places={this.props.places}
          onItemSelected={this.itemSelectedHandler} />
      </View>
    );
  }
}
// we need access to the store to get the places from redux.
const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

export default connect(mapStateToProps)(FindPlaceScreen);
