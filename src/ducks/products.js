// reducer
//import axios from 'axios'


export default function products(state = [],action) {
  switch (action.type) {
      case "getProduct":
          return handleProduct(state, action.payload);
      default:
          return state;
  } // nothing to do here, but we need products node in redux store
}

function handleProduct(state, payload) {
    return payload
}

export function addProduct(product) {
    return {
        type: "getProduct",
        payload: product
    }
}

// selectors
export function getProducts(state, props) {
    return state.products;
}

export function getProduct(state, props) {
    return state.products.find(item => item.id === props);
}
