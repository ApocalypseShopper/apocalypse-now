import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            price: '',
            quantity: '',
            imageUrl: ''
        }
    }

    render(){
        <div>
            <form>
                <label>Title</label>
                <input name="title"/>
                <label>Description</label>
                <input name="description"/>
                <label>Price</label>
                <input name="price"/>
                <label>Quantity</label>
                <input name="quantity"/>
                <label>Image URL</label>
                <input name="imageUrl"/>
            </form>
        </div>
    }
}