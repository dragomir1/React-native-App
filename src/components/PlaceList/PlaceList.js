import React, { Component } from 'react';


//ScrollView allows us to register touch events..in this case scrolling. it's also a wrapper component.THE SCROLLVIEW IS ONLY GOOD FOR SHORT LISTS
// FLATLIST IS THE COMPONENT GOOD FOR SCROLLING THROUGHT LARGE LISTS. the best use of performance for rendering lists.
import { View, StyleSheet, FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';


const placeList = props => {
  // in the view below the secondary view, we want to render some text elements where we output the placenames stored in the array.
  //  we need to do some code in the render function.  MAP is the the default logic for outputting arrays in react.
  // we use 'i' to place it in a key since we dont really have a unique identifer, we just pass i to be used as the key value in our text element. not the best solution but we dont have any unique id.

  // WHEN YOU DO YOUR FLATLIST, YOU NEED TO CHANGE THE WAY YOU OUTPUT YOUR LIST.
    // YOU WILL NO LONGER USE {placesOutput} AND ALSO NO LONGER MAP YOUR ARRAY.
    // props.places.map((place, i) => ());

// WHEN YOU DO YOUR FLATLIST, YOU NEED TO CHANGE THE WAY YOU OUTPUT YOUR LIST.
  // YOU WILL NO LONGER USE {placesOutput} AND ALSO NO LONGER MAP YOUR ARRAY. Flatlist accepts a couple of useful propertes:
  // data is required and has to be an array.
  // renderItem is needed to render the elements in your data source. this is a functon that returns JSX. info and item are properites of the renderItem prop.
    return (
      <FlatList
        style={styles.placesOutput}
        data={props.places}
        renderItem={(info) => (
          <ListItem
            placeName={info.item.name}
            placeImage={info.item.image}
            onItemRemove={()=> props.onItemSelected(info.item.key)}
          />
        )}
        />
    );
};
// this is the format for when creating styling for your elements.
const styles = StyleSheet.create({
    placesOutput: {
      width: '100%'
    }
  });

export default placeList;
