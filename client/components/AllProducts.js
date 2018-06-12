import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchProducts } from '../store/product'

import ProductCard from './containers/ProductCard'
import { Input } from 'antd'
import { postToCart, addToCart } from '../store/cart'

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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (product) {
      if(this.props.isLoggedIn) {
        this.props.addProduct(this.props.userId, product)
      } else {
        let currCart = JSON.parse(localStorage.getItem('cart')) || {}
        currCart[product.id] ? currCart[product.id] += 1 : currCart[product.id] = 1
        localStorage.setItem('cart', JSON.stringify(currCart))
      }
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
        <Input name='catInput'  className="inputSearch" onChange={this.handleChange}/>
        <Input name='nameInput'  className="inputSearch" onChange={this.handleChange}/>
        <ul className="cardContainer">
          {
            displayProducts.map(product => {
              return (
                  <ProductCard key={product.id} addToCart={this.handleClick} product={product}/>
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
    products: state.products.allProducts,
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProductsList: () => {
      dispatch(fetchProducts())
    },
    addProduct: (userId, product) => {
      dispatch(postToCart(userId, product))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
