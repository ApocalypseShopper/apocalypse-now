import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
<<<<<<< HEAD
import { getCart, fetchCart, postToCart, deleteFromCart } from '../store/cart'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
=======
import { getCart, fetchCart, postToCart, deleteFromCart, fetchLocalStorageCart } from '../store/cart'

>>>>>>> bda60efe5de248d27496354c6aa5f3bd3f3461b5
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
  constructor(props){
    super(props)
    this.state = {
      cart: {}
    }
  }

  componentDidMount(){
    if(false) {
      this.props.loadCart(userId)
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'))
      this.setState({cart})
      this.props.localCart(cart)
    }
  }

<<<<<<< HEAD
  handleClick(amount) {
    event.preventDefault()
   Checkout(amount)
  }


=======
>>>>>>> bda60efe5de248d27496354c6aa5f3bd3f3461b5
  render(){
    const products = this.props.products

    return (
      <div>
<<<<<<< HEAD
          { false &&
=======
        <ul>
          {
>>>>>>> bda60efe5de248d27496354c6aa5f3bd3f3461b5
              products.map(product => {
                return (
                  <li key={product.id}>
                    <h3> name: {product.title} costs {`$${product.price}`} and we have {product.quantity} on stock</h3>
                    {/*<button type="button" onClick={() => this.handleClick(product)}>{`Delete`}</button> */}
                  </li>
                )
              })
          }
          <Link to="/checkout">
              <button type="button" id="/checkout" onClick={this.handleClick}>Checkout</button>
          </Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.cart.products
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
