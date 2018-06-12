import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div className="homeContainer">
        <div className="titleContainer">
            <h1 className='title'>Apocalypse Now</h1>
            <h1>DAWN OF HUMANITY</h1>
        </div>         
        <img className='tent' src='http://serenitycouture.com/wp-content/uploads/2017/02/tent-logo.png'/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
