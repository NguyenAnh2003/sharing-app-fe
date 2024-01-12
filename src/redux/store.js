/** Store create the Redux store instance */
import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// enhancers
const composedEnhancers = composeWithDevTools();

// create store (storage)
export const store = createStore(
  rootReducer,
  composedEnhancers
);
