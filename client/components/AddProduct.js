import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postProduct } from '../store/product'

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

    handleChange(event){
        let name = event.target.name
        let value = event.target.value

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()

        const product = {
            ...this.state,
            imageUrl: this.state.imageUrl ? this.state.imageUrl : undefined,
            category: this.state.category ? this.state.category : undefined
        }
        this.props.addProduct(product)
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

const mapState = ()=>({})
const mapDispatch = (dispatch) => {
    return {
        addProduct: (user) =>{
            dispatch(postProduct(user))
        }
    }
}

export default connect(mapState, mapDispatch)(AddProduct)


