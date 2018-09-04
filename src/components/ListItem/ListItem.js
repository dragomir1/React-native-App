import React from 'react';
// if yo want to apply any sinificant styling you need a view to which you apply the styling to.
// if you want to output some writtten text, you CANNOT do it in the View.  you need a text node that you can next in the view.
// to style this view we need to import the StyleSheet

// Touchale is a wrapper component that react native provides that you can wrap around any component you want if you want to react to touch events ony.
//  TOUCHABLE IS A PARENT CLASS WHERE MULTIPLE SUBCLASSES INHERIT.
// TouchableWithoutFeedback allows us to register touch events on the elements it wraps.  can only have one child elements.  not adjacent ones.
// image allows you to add images to your jsx.
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
// placeName is chose as the property name. it could be any name you choose. this needs to be binded.
const listItem = (props) => (
  <TouchableWithoutFeedback onPress={props.onItemPressed}>
    <View style={styles.listItem} >
      <Image style={styles.placeImage} source={props.placeImage} />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#eee',
    alignItems: 'center',
    flexDirection: 'row'
  },
  placeImage: {
    // marginRight: 8,
    width: 30,
    height: 45,
    marginRight: 10

  }
})
export default listItem;
