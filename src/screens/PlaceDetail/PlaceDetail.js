import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/index';


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
        <View>
          <Image
            source={this.props.selectedPlace.image}
            style={styles.placeImage} />
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
    margin: 42,
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  placeImage: {
    marginLeft: 25
  },
  trashIcon: {
    alignItems: 'center'
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
