import axios from 'axios'

//Action types

const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const POST_ORDER = 'POST_ORDER'
//Initial state

const initialState = {
   allOrders: [],
   singleOrder: {},
}

//Action creators
const getOrders = orders => ({type: GET_ORDERS, orders})
const getSingleOrder = order => ({type: GET_SINGLE_ORDER, order})
const createOrder = order => ({type: POST_ORDER, order})

//Thunk creators
export const fetchOrders = () => {
    return dispatch => {
        axios.get('/api/orders')
            .then(res => res.data)
            .then(allOrders => {
                dispatch(getOrders(allOrders))
            })
            .catch(console.error)
    }
}

export const fetchSingleOrder = (orderId) => {
    return dispatch => {
        axios.get(`/api/orders/${orderId}`)
          .then(res => res.data)
          .then(singleOrder => {
            dispatch(getSingleOrder(singleOrder))
          })
          .catch(console.error)
    }
}

export const postOrder = (order) => {
    return dispatch => {
        axios.post('/api/orders', order)
        .then(res => res.data)
        .then(createdOrder => {
            dispatch(createOrder(createdOrder))
        })
        .catch(console.error)
    }
}

export const putProduct = (id, product) => {
    console.log(product)
    return dispatch => {
        axios.put(`/api/products/${id}`, {...product})
        .then(res => res.data)
        .then(updatedProduct => {
            const product = updatedProduct[1]
            dispatch(updateProduct(product))
        })
        .catch(console.error)
    }
}

//Reducer
export default function (state = initialState, action) {
    switch (action.type){
        case GET_PRODUCTS: {
            return {
                ...state,
                allProducts: action.allProducts
            }
        }
        case GET_SINGLE_PRODUCT: {
            return {
              ...state,
              singleProduct: action.singleProduct
            }
        }
        case POST_PRODUCT: {
            return {
                ...state,
                allProducts: [...state.allProducts, action.product]
            }
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                allProducts: [...state.allProducts.filter(prod => prod.id !== action.product.id), action.product]
            }
        }
        default: {
            return state
        }
    }
}
