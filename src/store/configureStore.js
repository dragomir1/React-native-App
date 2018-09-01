// compose allows you add multiple enhancers. so you can use DEVTOOLS and other middlewares
import { createStore, combineReducers, compose } from 'redux';
import placesReducer from './reducers/places';
// import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  places: placesReducer
});

let composeEnhancers = compose;

// __DEV__ is a special global variable that exposed to you in React Native which is only true in development mode.
if(__DEV__) {
  composeEnhancers == window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;
