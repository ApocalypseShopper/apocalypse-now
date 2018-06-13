import React from 'react'
import { List, Avatar, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
const CartItems = (props) => {
    return (
        <List
            className="cartContainer"
            itemLayout="vertical"
            size="small"
            dataSource={props.products}
            footer={<div><b>Survive</b> footer part</div>}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src={item.imageUrl} />}
                >
                    <List.Item.Meta
                        title={<Link to={`/product/${item.id}`}>{item.title}</Link>}
                        // description={item.description}
                    />
                    <div>
                         <h1>{'$' + item.price}</h1>

                        <select onChange={(evt) => props.onSubmit(evt,item)}>
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (<option key={num} value={num} selected={item.orderItem ? item.orderItem.quantity === num : false}>{num}</option>))}
                        </select>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default withRouter(CartItems)
