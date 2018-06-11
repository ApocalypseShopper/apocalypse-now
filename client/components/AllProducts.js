import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchProducts } from '../store/product'
import { Button } from 'antd';

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      catInput : '',
      nameInput: '',
      catList : [],
      nameList : []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const name = event.target.name
    const value = event.target.value
    const filter = name === 'catInput' ? value.split(' ') : this.state.catList
    const filterName = name === 'nameInput' ? value.split(' ') : this.state.nameList

    this.setState({
      [name] : value,
      catList : filter,
      nameList: filterName
    })
  }

  componentDidMount(){
    this.props.fetchProductsList()
  }

  render(){
    const selectedCategory = this.state.catList
    const selectedName = this.state.nameList

    const products = this.props.products || []
    const categoryFilteredProducts = products.filter(product => product.categories.map(cat => cat.name).some(cat => selectedCategory.indexOf(cat) > -1) )
    const firstFilter = categoryFilteredProducts.length ? categoryFilteredProducts : products 
    const nameFilteredProducts = firstFilter.length ? firstFilter.filter(product => product.title.split(' ').some(prod => selectedName.indexOf(prod) > -1) ) : []
    const displayProducts = nameFilteredProducts.length ? nameFilteredProducts : firstFilter

    return (
      <div>
        <input name='catInput' onChange={this.handleChange}/>
        <input name='nameInput' onChange={this.handleChange}/>
        <ul>
          {
            displayProducts.map(product => {
              return (
                <li key={product.id}>
                  <h3>categories: {`"${product.categories.map(cat => cat.name).join(' ')}"`}  name: {product.title} costs {`$${product.price}`} and we have {product.quantity} on stock</h3>
                  <Button>Add to Cart</Button>
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
