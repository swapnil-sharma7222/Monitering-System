import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { useCustom } from '../context/context'

const SignInPage = (isEmail) => {
  const { email, setEmail, mobileNo, setMobileNo } = useCustom()
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  // console.log(isEmail)
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle the sign-in logic here
    console.log('Signing in with:', email, password)
    try {
      const response = await axios.post('http://localhost:5000/user/signin', {
        email,
        password,
      })

      console.log('This is response of handle signin ', response.data)
      setToken(response.data.accessToken)
    } catch (error) {
      console.error('Error on signing in', error)
    }
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        {isEmail.state ? (
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        ) : (
          <input
            type="text"
            placeholder="phone number"
            name="phone number"
            value={mobileNo}
            onChange={handlePhoneChange}
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Link to="/forgot-password" className='forgot-password'>forgot password?</Link>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignInPage
// import React from 'react'
// function SignInForm() {
//   const [state, setState] = React.useState({
//     email: '',
//     password: '',
//   })
//   const handleChange = (evt) => {
//     const value = evt.target.value
//     setState({
//       ...state,
//       [evt.target.name]: value,
//     })
//   }

//   const handleOnSubmit = (evt) => {
//     evt.preventDefault()

//     const { email, password } = state
//     alert(`You are login with email: ${email} and password: ${password}`)

//     for (const key in state) {
//       setState({
//         ...state,
//         [key]: '',
//       })
//     }
//   }
//   return token ? (
//     <Navigate to="/admin" />
//   ) : (

//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={handleEmailChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={handlePasswordChange}
//           required
//         />
//       </div>
//       <button type="submit">Sign In</button>
//     </form>
//   )
// }

// export default SignInPage
