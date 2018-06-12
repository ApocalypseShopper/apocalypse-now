import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCart, fetchCart, postToCart, deleteFromCart, fetchLocalStorageCart } from '../store/cart'
import CartItems from './containers/CartItems'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cart: {}
    }
  }

  componentDidMount(){
    if(this.props.isLoggedIn) {
      this.props.loadCart(this.props.userId)
    } else {
      let cart = JSON.parse(localStorage.getItem('cart')) || {}
      this.setState({cart})
      this.props.localCart(cart)
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
      if(this.props.isLoggedIn) {
        this.props.loadCart(userId)
      } else {
        let cart = JSON.parse(localStorage.getItem('cart')) || {}
        this.setState({cart})
        this.props.localCart(cart)
      }
    }
  }

  render(){
    const products = this.props.products

    return (
      <div>
        <h1>Cart</h1>
        <ul>
          <CartItems products={products}/>
        </ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.cart.products,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
      loadCart: (userId) => {
        dispatch(fetchCart(userId))
      },
      localCart : (storage) => {
        dispatch(fetchLocalStorageCart(storage))
      },
      deleteProduct: (product) => {
        dispatch(deleteFromCart(orderId, product))
      }
  }
}

export default connect(mapState, mapDispatch)(Cart)
