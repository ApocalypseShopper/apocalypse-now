import React from 'react'
import { List, Avatar, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'

const CartItems = (props) => {
    console.log(props)
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
                        {/* <h1>{item.price}</h1>
                        <strong>You Ordered: {}</strong>
                        <form id={"QuanitityInput"} onSubmit={()=> this.props.handleSubmit()}>
                            <label>Order Quantity</label>
                            <input id={"quantity"}></input>
                            <button type="button" >Submit</button>
                        </form> */}
                        <select>
                            å
                        </select>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default withRouter(CartItems)
