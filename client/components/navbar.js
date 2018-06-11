import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends React.Component{
  constructor(){
    super()
    this.state = {
      current: 'mail'
    }
  }

  render(){
    const {handleClick, isLoggedIn} = this.props
    return (
      <div>
        {/* <h1>BOILERMAKER</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr /> */}
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
          <Menu.Item key="mail">
            <Icon type="mail" />Home
          </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />Log Out
          </Menu.Item>
        </Menu>
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
