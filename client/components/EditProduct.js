import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putProduct, fetchSingleProduct } from '../store/product'

class AddProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            price: '',
            quantity: '',
            imageUrl: '',
            category: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.loadProduct()
    }

    handleChange(event){
        let name = event.target.name
        let value = event.target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        let category = this.state.category ? this.state.category.split(' ') : null
        const stateProd = this.state
        const currentProd = this.props.product

        const updatedProduct = {
            title: stateProd.title || currentProd.title,
            description: stateProd.description || currentProd.description,
            price: stateProd.price || currentProd.price,
            quantity: stateProd.quantity || currentProd.quantity,
            imageUrl: stateProd.imageUrl || currentProd.imageUrl,
            category: category || currentProd.category
        }

        this.props.updateProduct(currentProd.id, updatedProduct)
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title</label>
                    <input name="title" onChange={this.handleChange}/>
                    <label>Description</label>
                    <input name="description" onChange={this.handleChange}/>
                    <label>Categories</label>
                    <input name="category" onChange={this.handleChange}/>
                    <label>Price</label>
                    <input name="price" onChange={this.handleChange}/>
                    <label>Quantity</label>
                    <input name="quantity" onChange={this.handleChange}/>
                    <label>Image URL</label>
                    <input name="imageUrl" onChange={this.handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapState = (state) => {
    const product = state.products.singleProduct;
    return { product }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        updateProduct: (id, product) =>{
            dispatch(putProduct(id, product))
        },
        loadProduct: () => {
            dispatch(fetchSingleProduct(Number(ownProps.match.params.productId)))
        }
    }
}

export default connect(mapState, mapDispatch)(AddProduct)


