import axios from 'axios'

//Action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//Initial state

const initialState = {
    allProducts: [],
    singleProduct: {}
}

//Action creators
const getProducts = allProducts => ({type: GET_PRODUCTS, allProducts})
const getSingleProduct = singleProduct => ({type: GET_SINGLE_PRODUCT, singleProduct})

//Thunk creators
export const fetchProducts = () => {
    return dispatch => {
        axios.get('/api/products')
            .then(res => res.data)
            .then(allProducts => {
                dispatch(getProducts(allProducts))
            })
            .catch(console.error)
    }
}

export const fetchSingleProduct = (productId) => {
    return dispatch => {
        axios.get(`/api/products/${productId}`)
          .then(res => res.data)
          .then(singleProduct => {
            dispatch(getSingleProduct(singleProduct))
          })
          .catch(console.error)
    }
}

//Reducer
export default function (state = initialState, action) {
<<<<<<< HEAD
    switch(action.type){
=======
    switch (action.type){
>>>>>>> cf7c29e4195260420e4ff714bb3efe7f8b0d44ef
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

        default: {
            return state
        }
    }
}
