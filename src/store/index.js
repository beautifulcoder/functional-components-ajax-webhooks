import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { dummyReducer } from './dummyStore';

let middleware = [];
middleware.push(thunk.withExtraArgument(axios));

if (process.env.NODE_ENV === 'development') {
  const {logger} = require('redux-logger');
  middleware.push(logger);
}

const reducers = combineReducers({dummy: dummyReducer});

export default () => createStore(reducers, applyMiddleware(...middleware));
