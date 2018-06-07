import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getCart } from '../store/cart'

/**
 * COMPONENT
 */

 let hardCodedCart = [
     {id: 2,title: 'stuff', description: 'awesome', price: 100, quantity: 35 },
     {id: 23,title: 'more stuff', description: 'awesome', price: 102, quantity: 9 },
     {id: 3,title: 'Just Du it', description: 'awesome', price: 104, quantity: 14 },
     {id: 4,title: 'Jessie has a nice beard', description: 'awesome', price: 10.00, quantity: 13 },
     {id: 5,title: 'Thanh loves cookies', description: 'awesome', price: 12, quantity: 0 },
     {id: 53,title: 'Ivan is a great CTO', description: 'awesome', price: 115, quantity: 10 },
     {id: 52,title: 'We took a lot of time naming these', description: 'awesome', price: 25, quantity: 1 },
     {id: 51,title: 'Hard coding is boring!!', description: 'awesome', price: 100, quantity: 56 },
     {id: 50,title: 'Can\'t wait to sleep', description: 'awesome', price: 40, quantity: 34 },
 ]
class Cart extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.dispatch(getCart(hardCodedCart));
  }

  render(){
    const products = this.props.cart

    return (
      <div>
        <ul>
          {
            products.map(product => {
              return (
                <li key={product.id}>
                  <h3> name: {product.title} costs {`$${product.price}`} and we have {product.quantity} on stock</h3>
                </li>
              )
            })
          }
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
    cart: state.cart.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
      dispatch,
  }
}

export default connect(mapState, mapDispatch)(Cart)
