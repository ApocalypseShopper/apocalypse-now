import React from 'react'
import { Card, Icon } from 'antd'
const { Meta } = Card
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
    return (
        <Link to={`/products/${props.id}`}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={props.name} src={props.imageUrl} />}
                actions={[<Icon type="shopping-cart" />]}
            >
                <Meta
                title={props.title + ' ' + props.price}
                description={`"${props.categories.map(cat => cat.name).join(' ')}"`}
                />
            </Card>
        </Link>  
    )
}

export default ProductCard