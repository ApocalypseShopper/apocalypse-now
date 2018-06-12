import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchProducts } from '../store/product'
import { postToCart, addToCart } from '../store/cart'

const userId = 101;

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
      if(false) {
        console.log('HHHHHHHHH', product)
        this.props.addProduct(userId, product)
      } else {
        console.log('heyyyyyyy')
        let currCart = JSON.parse(localStorage.getItem('cart')) || {}
        console.log('***************',currCart[product.id])
        currCart[product.id] ? currCart[product.id] += 1 : currCart[product.id] = 1
        console.log(currCart)
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
    console.log('------cart', this.props.cart)
    const selectedCategory = this.state.catList
    const selectedName = this.state.nameList

    const products = this.props.products || []
    console.log('products', products)
    const categoryFilteredProducts = products.filter(product => product.categories.map(cat => cat.name).some(cat => selectedCategory.indexOf(cat) > -1) )
    const firstFilter = categoryFilteredProducts.length ? categoryFilteredProducts : products
    console.log('fist filter',firstFilter)
    const nameFilteredProducts = firstFilter.length ? firstFilter.filter(product => product.title.split(' ').some(prod => selectedName.indexOf(prod) > -1) ) : []
    console.log('name filter', nameFilteredProducts)
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
                  <button onClick={() => this.handleClick(product)}>Add to Cart</button>
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
    products: state.products.allProducts,
    cart: state.cart
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
