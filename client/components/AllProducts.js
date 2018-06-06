import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchProducts } from '../store/product'

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchProductsList()
  }

  render(){
    const products = this.props.products || []
    return (
      <div>
        <ul>
          {
            products.map(product => {
              return (
                <li key={product.id}>
                  <h3>categories:  name: {product.title} costs {product.price} and we have {product.quantity} on stock</h3>
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
    products: state.products.allProducts
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProductsList: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
