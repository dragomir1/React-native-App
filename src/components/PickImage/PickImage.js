import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
// import backgroundImage from '../../assets/background.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {

  state = {
    pickedImage: null
  };


    // we pass two arguments to this method. the first is an object where we configure the image. and the second argument is the response.
  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
      if (res.didCancel) {
        console.log("User cancelled");
      } else if (res.error) {
        console.log("error", res.error);
      } else {
        this.setState({
          // we set it this way becuase of the way image source works..it needs an object with an URI property.
          pickedImage: { uri: res.uri }
        });
        // base64: res.data allows us to get the image as a base 64 string.  this will allow us to store the image on a server and not just the local machine.
        this.props.onImagePicked({uri: res.uri, base64: res.data})
      }
    });
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.imagePreview} />
        </View>
        <View style={styles.button}>
          <Button title="pick image" onPress={this.pickImageHandler} />
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
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "95%",
    height: 150
  },
  button: {
    margin: 8
  },
  imagePreview: {
    width: "100%",
    height: "100%"
  }
});

export default PickImage;
