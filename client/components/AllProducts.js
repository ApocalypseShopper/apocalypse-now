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
    this.state = {
      catInput : '',
      catList : [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const name = event.target.name
    const value = event.target.value
    const filter = name === 'catInput' ? value.split(' ') : this.state.catList

    this.setState({
      [name] : value,
      catList : filter,
    })
  }

  componentDidMount(){
    this.props.fetchProductsList()
  
  }

  render(){
    const selectedCategory = this.state.catList
    const products = this.props.products || []
    const filteredProducts = products.filter(product => product.category.some(cat => selectedCategory.indexOf(cat) > -1) )
    const displayProducts = filteredProducts.length ? filteredProducts : products 
    return (
      <div>
        <input name='catInput' onChange={this.handleChange}/>
        <ul>
          {
            displayProducts.map(product => {
              return (
                <li key={product.id}>
                  <h3>categories: {product.category.join(' ')}  name: {product.title} costs {`$${product.price}`} and we have {product.quantity} on stock</h3>
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
