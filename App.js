import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlace, deletePlace, selectPlace, unselectPlace } from './src/store/actions/index';


// TextInput: A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

// StyleSheet component is React Native's way of creating objects.(see styling below)  which you then can assign to the style  of elements, and then where you can point to propteties of your object.
// YOU NEED TO IMPORT ALL THE REACT NATIVE COMPONENTS YOU WANT TO USE.
import { StyleSheet, View } from 'react-native';
import UserInput from './src/components/UserInput/UserInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
// we can import the image with an import statement. RN actually makes this image into a js object and connects a path to the source file.


class App extends Component {

    placeAddedHandler = placeName => {
      this.props.onAddPlace(placeName)
      console.log('place added');
      // this.setState(prevState => {
      //   return {
      //     // concat adds a new element and returns a new array to update it immutably.
      //     // this line concat({key: Math.random(), value: placeName}) was originally concat(placeName).  we added the additional code to pass it to the FlatList data property so we can use the info for the array. the array requires a 'key' property.
      //
      //     places: prevState.places.concat({
      //       key: Math.random(),
      //       name: placeName,
      //       image: placeImage
      //         // we are now adding a link to get the image straight from the web.
      //         // IMAGES LOADED FROM THE INTERNET NEEDS A STYLING!!! YOU NEED TO SET A STYLE. OTHERWISE IT WONT BE visible.
      //
      //       // image:{
      //       //   uri: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiW1-ne9MzcAhUMiqwKHUWYBLkQjRx6BAgBEAU&url=http%3A%2F%2Fdisney.wikia.com%2Fwiki%2FRolly_(Puppy_Dog_Pals)&psig=AOvVaw0I2L5wjEsCGW1jXlTvRCH9&ust=1533248816277490"
      //       // }
      //     })
      //   };
      // });
    };
// setState runs asynchronously
// the filter method is a default JS array method, which will return a new array, which is the array with all the elements that match the filter criteria as defined in the funtion we pass to filter.

// if the i does not equal to the index we recieve, we return true, becuase that means the item should stay in the array.
// if it's equal it will return false that it shouldn't be part of the array. becuuase if the index we delete is the index we're looking at then it's the item we deleted and shouldn't be part of the array.
                // old code:

                // removeListItemHandler = index => {
                //   this.setState(prevState => {
                //     return {
                //       places: prevState.places.filter((place, i) => {
                //         return i !== index;
                //       })
                //     };
                //   });
                // }

                // new code:

// here we want to store information on which place was selected so that we can pass it to the PlaceDetail modal.
// selectedPlace: prevState.places.find() => FIND IS A JS DEFAULT METHOD WHICH FINDS ONE ELEMENT IN AN ARRAY THAT FULLFILLS A CERTAIN CRITERIA.  THE CRITERIA IS PASSED I A FUNCTION WE PASS TO FIND. that funcion will be exectued on every element in the places array
// we need to return true if its the object we're looking and false if it's not the object
  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
    // this.setState(prevState => {
    //   return {
    //     selectedPlace: prevState.places.find(place => {
    //       return place.key === key;
    //     })
    //   };
    // });
  };
  // we use the key to remove an item instead of the index.
    // removeListItemHandler = key => {
    //   this.setState(prevState => {
    //     return {
    //       places: prevState.places.filter(place => {
    //         return place.key !== key;
    //       })
    //     };
    //   });
    // }
    placeDeletedHandler = () => {
      this.props.onDeletePlace();
      // this.setState(prevState => {
      //   return {
      //     places: prevState.places.filter(place => {
      //       return place.key !== prevState.selectedPlace.key;
      //     }),
      //     selectedPlace: null
      //   };
      // });

    };

    modalClosedHandler = () => {
      this.props.onUnSelectPlace();
      // this.setState({
      //   selectedPlace: null
      // })
    };

  render() {

    // RN only emulates CSS.  it doesnt offer the same properties or complexitites as css. your only real choices are to create flex elements or not showing them at all. so you can set display to 'flex' or 'none'.
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.props.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler} />
        <UserInput onPlaceAdded={this.placeAddedHandler}/>
        <View style={styles.placesOutput}>
          <PlaceList
            places={this.props.places}
            onItemSelected={this.placeSelectedHandler} />
        </View>
      </View>
    );
  }
}
// this is the format for when creating styling for your elements.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  placesOutput: {
    width: '100%'
  }
});

// the connect is a funtion that will return a function to which we then pass the App.
// the connect function also accepts two functions.

// connect will pass this argument into the function becuase we are passing the const to connect.  in the function body we have to return a js object where we map some keys whcih we can access as props in our component to slices of our state.
const mapStatetoProps = state => {
  return {
    // the first places access the rootReducer.  the second places access the places proptery in our places reducer.
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};
// here we map propterites to props we can use in our components where we can use them as props.
const mapDispatchtoProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onUnSelectPlace: () => dispatch(unselectPlace())
  };
};
export default connect(mapStatetoProps, mapDispatchtoProps)(App);
