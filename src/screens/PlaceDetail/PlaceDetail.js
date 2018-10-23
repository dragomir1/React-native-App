import React, { Component } from 'react';
import { View,
         Image,
         Text,
         Button,
         StyleSheet,
         Dimensions,
         TouchableOpacity }
         from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/index';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

// we check if selectedPlace is set conditionally, the modal will only get rendered if selectedPlace is set and loaded.

// converting this into a class
class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage} />
          </View>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width /
                Dimensions.get('window').height *
                0.0122,
              }}
              style={styles.map}
              >
              <Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.trashIcon}>
            <Icon size={30} name="ios-trash" color='red' />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}
  // let modalContent = null;
  //
  // if(props.selectedPlace) {
  //   modalContent = (
  //
  //   );
  // }
  // the 'visible' property on the modal component deterines whether your modal is visible or not. it's a boolean.  here we check if selectedPlace is not null. meaning if the contents are loaded.
  //
  // <Modal
  //   onRequestClose={props.onModalClosed}
  //   visible={props.selectedPlace !== null}
  //   animationType='slide'>
      // </Modal>


const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  placeDetailContainer: {
    flex: 1
  },
  placeImage: {
    width: "100%",
    height: "80%"
  },
  trashIcon: {
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  subContainer: {
    flex: 1
  }
});

const mapDispachToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  };
};
export default connect(null, mapDispachToProps)(PlaceDetail);

// <Button
//   title="Delete"
//   color='red'
//   onPress={props.onItemDeleted} />
