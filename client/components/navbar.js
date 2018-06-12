import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {logout} from '../store'

import { Menu, Icon } from 'antd';

class Navbar extends React.Component{
  constructor(){
    super()
    this.state = {
      current: 'products'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.setState({
      current: this.props.location.pathname.slice(1)
    })
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    this.props.history.push(`/${e.key}`)
  }

  render(){
    const {isLoggedIn} = this.props
    console.log(this.props)
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              theme="dark"
            >
              <Menu.Item key="products">
                <Icon type="tool" />Products
              </Menu.Item>
              <Menu.Item key="logout">
                <Icon type="logout" />Log Out
              </Menu.Item>
            </Menu>
          ) : (
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              theme="dark"
            >
              <Menu.Item key="products">
                <Icon type="tool" />Products
              </Menu.Item>
              <Menu.Item key="login">
                <Icon type="login" />Log In
              </Menu.Item>
              <Menu.Item key="signup">
                <Icon type="user-add" />Sign Up
              </Menu.Item>
            </Menu>
          )}
        </nav>
      

      </div>
    )
  }
} 

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
