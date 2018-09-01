import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// we check if selectedPlace is set conditionally, the modal will only get rendered if selectedPlace is set and loaded.
const placeDetail = props => {
  let modalContent = null;
  if(props.selectedPlace) {
    modalContent = (
      <View>
        <Image
          source={props.selectedPlace.image}
          style={styles.placeImage} />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </View>
    );
  }
  // the 'visible' property on the modal component deterines whether your modal is visible or not. it's a boolean.  here we check if selectedPlace is not null. meaning if the contents are loaded.
    return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.selectedPlace !== null}
      animationType='slide'>
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity>
            <View style={styles.trashIcon}>
            <Icon size={30} name="ios-trash" color='blue' onPress={props.onItemDeleted} />
            </View>
          </TouchableOpacity>

          <Button
            title="close"
            color='green'
            onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
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
