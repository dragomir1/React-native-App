import React, { Component } from 'react';
import { View, Text} from 'react-native';

// we need to render all of our places.  so we need access to the store to get the places.
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';


class FindPlaceScreen extends Component {
  render() {
    return (
      <View>
        <PlaceList places={this.props.places}
          onItemSelected={} />
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
