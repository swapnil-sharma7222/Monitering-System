import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'

const SignInPagePhone = (isEmail) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const handleEmailChange = (e) => {
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
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default SignInPagePhone
