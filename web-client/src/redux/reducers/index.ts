import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AuthReducer from "./auth.reducer";
import errorReducer from "./error.reducer";
import postReducer from "./post.reducer";
import UiReducer from "./ui.reducer";
// declare the types thing for the redux devtools
// only for development/testing purposes
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// combine all the reducers into one root reducer
const reducers = combineReducers({
  auth: AuthReducer,
  error: errorReducer,
  post: postReducer,
  ui: UiReducer,
});

// config for the redux devtools browser extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creating the redux store
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
