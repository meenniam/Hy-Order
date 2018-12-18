import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import cartReducer from './ducks/cart';
import productsReducer from './ducks/products';
import App from './App';
import 'w3-css/w3.css';
//import productsData from './data/products';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import setAuthorizationToken from './setAuthorizationToken'
import jwt from 'jsonwebtoken'

const initialState ={
  isAuthenticate:false,
  user:{}
}

const authReducer = (state=initialState,action)=>{
  switch (action.type) {
    case 'setCurrentUser':
        state={
          ...state,
          isAuthenticate: !isEmpty(action.payload),
          user: action.payload
        }
      break;
      default:
  }
  return state
}


const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer
});

let store = createStore(
    rootReducer
    ,{
        products: [] // initial store values
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for debugging
);

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch({
    type: "setCurrentUser",
    payload: jwt.decode(localStorage.jwtToken)
  });
}

render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
