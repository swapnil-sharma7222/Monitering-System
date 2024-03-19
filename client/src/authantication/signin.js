
import React, { useState } from 'react'
import axios from 'axios'
import { Link ,Navigate } from 'react-router-dom'


const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken]=useState("")


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
      });
      
      console.log('This is response of handle signin ', response.data)
      setToken(response.data.accessToken)

    } catch (error) {
      console.error('Error on signing in', error)
    }
  }

  return token ? (
    <Navigate to="/admin" />
  ) : (

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  )
}

export default SignInPage

