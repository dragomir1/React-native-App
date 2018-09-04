// actions are just JS objects and an actioncreater servers as a factory which spits out actions.  so they have to return an object. to be a valid action.  this objects needs to have a type property.

import { ADD_PLACE, DELETE_PLACE } from './actionTypes';


export const addPlace = (placeName) => {
  return {
    type: ADD_PLACE,
    placeName: placeName
  };
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};

// export const selectPlace = (key) => {
//   return {
//     type: SELECT_PLACE,
//     placekey: key
//   };
// };
//
// export const unselectPlace = () => {
//   return {
//     type: UNSELECT_PLACE
//   };
// };
