import { getProduct } from '../ducks/products';
//import products from '../data/products';

// actions
const CART_ADD   = 'cart/ADD';
const CART_REMOVE = 'cart/REMOVE';
const CART_INCREASE = 'cart/INCREASE';
const CART_RESET = 'cart/RESET';

// reducer
const initialState = {
    amount:[],
    items: [], // array of product ids
    currency: 'BATH'
};

export default function cart(state = initialState, action = {}) {
    switch (action.type) {
        case CART_ADD:
            return handleCartAdd(state, action.payload);
        case CART_REMOVE:
            return handleCartRemove(state, action.payload);
        case CART_INCREASE:
            return handleCartIncrease(state, action.payload);
        case CART_RESET:
            return handleReset(state);

        default:
            return state;
    }
}

function handleReset(state) {
    return {
        amount: [],
        items:[]
    };
}


function handleCartIncrease(state, payload) {
    return {
        ...state,
        amount: [ ...state.amount, payload ]
    };
}


function handleCartAdd(state, payload) {
    return {
        ...state,
        items: [ ...state.items, payload ]
    };
}

function handleCartRemove(state, payload) {
    return {
        ...state,
        items: state.items.filter(id => id.productId !== payload.productId),
        amount: state.amount.filter(amount => amount.productId !== payload.productId)
    };
}


export function increaseToCart(amount,productId,price,name,image) {
    return {
        type: CART_INCREASE,
        payload: {
            amount,
            productId,
            price,
            name,
            image
        }
    }
}
// action creators
export function resetToCart() {
    return {
        type: CART_RESET
    }
}

export function addToCart(productId,amount) {
    return {
        type: CART_ADD,
        payload: {
            productId,
            amount
        }
    }
}

export function removeFromCart(productId) {
    return {
        type: CART_REMOVE,
        payload: {
            productId
        }
    }
}

// selectors
export function isInCart(state, props) {
    const pos = state.cart.items.map(e=>e.productId).indexOf(props.id)
    return pos !== -1;
}

export function getItems(state, props) {
    //state.cart.items.map(id => console.log(id));
    return state.cart.items.map(id => getProduct(state, id.productId));
}

export function getAmount(state, props) {
    //state.cart.items.map(id => console.log(id));
    return state.cart.items.map(id => id.amount);
}

export function getPurc(state, props) {
    //state.cart.items.map(id => console.log(id));
    return state.cart.amount
}

export function getCurrency(state, props) {
    return state.cart.currency;
}

export function getTotal(state, props) {
    return state.cart.items.reduce((acc, id) => {
        //const arrAmount = state.cart.amount
        const item = getProduct(state, id.productId);
        //const mul = item.price*arrAmount[id-1].amount;
        return acc + item.price*id.amount;
    }, 0);
}
