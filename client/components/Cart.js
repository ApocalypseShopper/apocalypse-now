import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCart, fetchCart, postToCart, deleteFromCart, fetchLocalStorageCart } from '../store/cart'
import { updateCartQuant } from '../store/order'
import CartItems from './containers/CartItems'

/**
 * COMPONENT
 */

//  let hardCodedCart = [
//      {id: 2,title: 'stuff', description: 'awesome', price: 100, quantity: 35 },
//      {id: 23,title: 'more stuff', description: 'awesome', price: 102, quantity: 9 },
//      {id: 3,title: 'Just Du it', description: 'awesome', price: 104, quantity: 14 },
//      {id: 4,title: 'Jessie has a nice beard', description: 'awesome', price: 10.00, quantity: 13 },
//      {id: 5,title: 'Thanh loves cookies', description: 'awesome', price: 12, quantity: 0 },
//      {id: 53,title: 'Ivan is a great CTO', description: 'awesome', price: 115, quantity: 10 },
//      {id: 52,title: 'We took a lot of time naming these', description: 'awesome', price: 25, quantity: 1 },
//      {id: 51,title: 'Hard coding is boring!!', description: 'awesome', price: 100, quantity: 56 },
//      {id: 50,title: 'Can\'t wait to sleep', description: 'awesome', price: 40, quantity: 34 },
//  ]

const userId = 101;  //hardCoded orderId

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.loadCart(userId)
    } else {
      let cart = JSON.parse(localStorage.getItem('cart')) || {}
      this.setState({ cart })
      this.props.localCart(cart)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      if (this.props.isLoggedIn) {
        this.props.loadCart(userId)
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
    console.log('',products)
    return (
      <div>
        <h1>Cart</h1>
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
    cart: state.cart
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
