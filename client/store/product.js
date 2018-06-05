import axios from 'axios'

//Action types 

const GET_PRODUCTS = 'GET_PRODUCTS'

//Initial state 

const initialState = {
    allProducts: []
}

//Action creators

const getProducts = allProducts => ({type: GET_PRODUCTS, allProducts})

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

//Reducer

export default function (state = initialState, action) {
    console.log(action)
    switch(action.type){
        case GET_PRODUCTS: {
            return {
                ...state,
                allProducts: action.allProducts
            }
        }
        default: {
            return state
        }
    }
}