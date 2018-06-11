import axios from 'axios'
//Action Type
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
// Action Creator
export const getCart = cart => {
   return {
    type: GET_CART,
    cart
   }
}
export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product
       }
}
export const deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}
// Initial State
const initialState = {
    products: []
}
// Thunks
export const fetchCart = (userId) => {
    return dispatch => {
        axios.get(`/api/orders/${userId}`)
            .then(res => res.data)
            .then(currCart => {
                dispatch(getCart(currCart))
            })
            .catch(console.error)
    }
}
export const postToCart = (userId, product) => {
    return dispatch => {
        axios.put(`/api/orders/${userId}/products`, product)
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
      // .then(() => {
      //     dispatch(deleteProduct(product))
      // })
      .catch(console.error)
  }
}
// Reducer
export default function (state = initialState, action) {
    switch(action.type) {
        case GET_CART:
            return {...state, products: action.cart.products}
        case ADD_TO_CART:
            return {...state, products: [...state.products, action.product]}
        // case DELETE_PRODUCT:
        //     if(state.cart.cart.products !== [])
        //       return {
        //           ...state,
        //           cart: {
        //             cart: {
        //               ...state.cart.cart,
        //               products: state.cart.cart.products.filter(prod => prod.id !== action.product.id)
        //           }
        //         }
        //       }
        default:
            return state
    }
}
