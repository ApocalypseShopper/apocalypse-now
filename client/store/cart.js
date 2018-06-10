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
export const fetchCart = (orderId) => {
    return dispatch => {
        axios.get(`/api/orders/${orderId}`)
            .then(res => res.data)
            .then(currCart => {
                dispatch(getCart(currCart))
            })
            .catch(console.error)
    }
}
export const postToCart = (orderId, product) => {
    return dispatch => {
        axios.put(`/api/orders/${orderId}/products`, product)
        .then(res => res.data)
        .then(postedProduct => {
            dispatch(addToCart(postedProduct))
        })
        .catch(console.error)
    }
}
export const deleteFromCart = (orderId, product) => {
  return dispatch => {
      axios.delete(`/api/orders/${orderId}/products`, product)
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
