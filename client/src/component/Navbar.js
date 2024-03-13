import React from 'react'
import './NavBar.css' // Make sure to create a corresponding CSS file
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Add other navigation items here if needed */}
        <div className="nav-buttons">
          <Link to="/signin">
            <button className="sign-in-btn">Sign In</button>
          </Link>
          <Link to='/signup'>
            <button className="sign-up-btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
