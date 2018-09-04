import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

import placeImage from '../../assets/PupinGrass.jpg';


const initialState = {
  places: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
    // we always return a brand new state.  never directly manipulaite the old state. which will replace the old one...immutably. every new property we add below the '...state' is either added to it or overides existing properties we pulled out.  but old properties which we dont pull out will be kept.
    return {
      ...state,
        places: state.places.concat({
        key: Math.random(),
        name: action.placeName,
        image: placeImage
      })
    };
    case DELETE_PLACE:
    return {
      ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        })
    };
    // case SELECT_PLACE:
    // return {
    //   ...state,
    //   selectedPlace: state.places.find(place => {
    //     return place.key === action.placekey;
    //   })
    // };
    // case UNSELECT_PLACE:
    // return {
    //   ...state,
    //   selectedPlace: null
    // };
    default:
    return state;
  }
};

export default reducer;
