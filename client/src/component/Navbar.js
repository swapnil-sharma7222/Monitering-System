// import React from 'react'
// import './NavBar.css' // Make sure to create a corresponding CSS file
// import { Link } from 'react-router-dom'

// const NavBar = () => {
//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         {/* Add other navigation items here if needed */}
//         <div className="nav-buttons">
//           <Link to="/signin">
//             <button className="sign-in-btn">Sign In</button>
//           </Link>
//           <Link to='/signup'>
//             <button className="sign-up-btn">Sign Up</button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default NavBar/

import React, { useState } from 'react'
import './NavBar.css'
import SignInForm from '../authantication/signin'
import SignUpForm from '../authantication/signup'

export default function App() {
  const [type, setType] = useState('signIn')
  const[isEmail,setIsEmail]=useState(true);
  const  handleOnClick = (text) => {
    if (text !== type) {
      setType(text)
      return
    }
  }
    const handleEmail = (text) => {
      setIsEmail(true);
      if (text !== type) {
        setType(text)
        return
      }
      
    }
      const handlePhone = (text) => {
        setIsEmail(false);
        if (text !== type) {
          setType(text)
          return
        }
      }
  const containerClass =
    'container ' + (type === 'signUp' ? 'right-panel-active' : '')
  return (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm state={isEmail}/>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handlePhone('signIn')}
              >
                Log in with Mobile
              </button>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleEmail('signIn')}
              >
                Log in with Email
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick('signUp')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
