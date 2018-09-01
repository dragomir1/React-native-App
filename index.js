import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';


const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// registerComponent needs to return a function that in turn, returns another function that in turn returns jsx code.  we we converted the above code into a function that returns jsx and we add it to the to funtion part of the code below.  now it returns a function that returns a funtion that return jsx.
AppRegistry.registerComponent('rn_app', () => RNRedux);
