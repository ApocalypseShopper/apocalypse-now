import React from 'react'
import { Card, Icon } from 'antd'
const { Meta } = Card
import { withRouter } from 'react-router-dom' 

const ProductCard = (props) => {
    return (
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={props.product.name} src={props.product.imageUrl} />}
        actions={[<Icon onClick={() => {props.addToCart(props.product)}} type="shopping-cart" />,<Icon type="eye" onClick={() => props.history.push(`/products/${props.product.id}`)}/>]}
        >
                <Meta
                title={props.product.title + ' $' + props.product.price}
                description={`"${props.product.categories.map(cat => cat.name).join(' ')}"`}
                />
        </Card> 
    )
}

export default withRouter(ProductCard)