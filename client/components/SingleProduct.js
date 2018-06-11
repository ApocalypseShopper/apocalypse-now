import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/product'

/**
 * COMPONENT
 */

class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadProduct();
  }

  render() {
    const singleProduct = this.props.singleProduct
    console.log(singleProduct)
    return (
      <div>
        <h2>{singleProduct.title}</h2>
        <img src={singleProduct.imageUrl} />
        <p>{`Description: ${singleProduct.description}`}</p>
        <p>{`Category`}</p>
        <ul>
          {singleProduct.categories &&
              singleProduct.categories.map(category => {
                return <li key={category.id}>{category.name}</li>
              })}
        </ul>
        <p>{`Price: $${singleProduct.price}`}</p>
        <p>{`There are ${singleProduct.quantity} in the inventory`}</p>
      </div>
    );
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    singleProduct: state.products.singleProduct
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadProduct: () => {
      dispatch(fetchSingleProduct(Number(ownProps.match.params.productId)))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct);
