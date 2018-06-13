import axios from 'axios'

//Action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const POST_PRODUCT = 'POST_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//Initial state

const initialState = {
    allProducts: [],
    singleProduct: {}
}

//Action creators
const getProducts = allProducts => ({type: GET_PRODUCTS, allProducts})
const getSingleProduct = singleProduct => ({type: GET_SINGLE_PRODUCT, singleProduct})
const createProduct = product => ({type: POST_PRODUCT, product})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})

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

export const postProduct = (product) => {
    return dispatch => {
        axios.post('/api/products', product)
        .then(res => res.data)
        .then(createdProduct => {
            dispatch(createProduct(createdProduct))
        })
        .catch(console.error)
    }
}

export const putProduct = (id, product) => {
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
