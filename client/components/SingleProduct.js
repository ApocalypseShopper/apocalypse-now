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
    console.log(this.props.singleProduct)
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <h2>{singleProduct.title}</h2>
        <img src={singleProduct.imageUrl} />
        <p>{singleProduct.description}</p>
        <p>{singleProduct.price}</p>
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
