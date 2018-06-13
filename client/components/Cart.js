import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCart, fetchCart, postToCart, deleteFromCart, fetchLocalStorageCart } from '../store/cart'
import { updateCartQuant } from '../store/order'
import CartItems from './containers/CartItems'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if(this.props.isLoggedIn) {
      this.props.loadCart(this.props.userId)
    } else {
      let cart = JSON.parse(localStorage.getItem('cart')) || {}
      this.setState({ cart })
      this.props.localCart(cart)
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.isLoggedIn !== this.props.isLoggedIn) {
      if(this.props.isLoggedIn) {
        this.props.loadCart(this.props.userId)
      } else {
        let cart = JSON.parse(localStorage.getItem('cart')) || {}
        this.setState({ cart })
        this.props.localCart(cart)
      }
    }
  }

  handleSubmit(event, product) {
    console.log(product)
    this.props.updateQuantity(product.orderItem.orderId, product.id, event.target.value)
  }

  render() {
    const products = this.props.products || []
    let total=0
    if(products.length > 0) {
      products.forEach(product => {
        let orderItem = product.orderItem || {quantity: 0}
        total += product.price * orderItem.quantity
      })
    }

    return (
      <div>
        <h1>Cart</h1>
        <h1>Your total: {`${total}`}</h1>
        <ul>
          <CartItems products={products} onSubmit={this.handleSubmit} />
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
    localCart: (storage) => {
      dispatch(fetchLocalStorageCart(storage))
    },
    deleteProduct: (product) => {
      dispatch(deleteFromCart(orderId, product))
    },
    updateQuantity: (orderId, productId, quantity) => {
      dispatch(updateCartQuant(orderId, productId, quantity))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
