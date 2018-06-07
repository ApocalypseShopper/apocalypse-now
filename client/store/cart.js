import axios from 'axios'
//Action Type
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART'
// Action Creator
export const getCart = cartProducts => {
   return {
    type: GET_CART,
    cartProducts,
   } 
} 
const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product,
       } 
}
// Initial State
const initialState = {
    cart: [],
}
// Thunks
export const fetchCart = () => {
    return dispatch => {
        axios.get('/api/cart')
            .then(res => res.data)
            .then(currCart => {
                dispatch(getCart(currCart))
            })
            .catch(console.error)
    }
}
export const postToCart = (product) => {
    return dispatch => {
        axios.post('/api/cart', product)
        .then(res => res.data)
        .then(postedProduct => {
            dispatch(addToCart(postedProduct))
        })
        .catch(console.error)
    }
}
// Reducer
export default function (state = initialState, action) {
    switch(action.type) {
        case GET_CART:
            return {
                ...state, 
                cart : action.cartProducts
            }
        case ADD_TO_CART:
            return {
                ...state, 
                cart: [...state.cart, action.product]
            }
        default:
            return state
    }
}
