import React from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// we check if selectedPlace is set conditionally, the modal will only get rendered if selectedPlace is set and loaded.
const placeDetail = props => {
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
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={props.selectedPlace.image}
            style={styles.placeImage} />
          <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.trashIcon}>
            <Icon size={30} name="ios-trash" color='blue' onPress={props.onItemDeleted} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
};

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
export default placeDetail;

// <Button
//   title="Delete"
//   color='red'
//   onPress={props.onItemDeleted} />
