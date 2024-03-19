import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, redirect } from 'react-router-dom'
import { useCustom } from '../context/context'

const SignUpPage = () => {
  const { email, setEmail, name, setName } = useCustom()
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSingUp] = useState(false)

  const handleEmailChange = (e) => {
    //console.log(e.target.value)
    setEmail(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle the sign-in logic here
    console.log('Signing up with:', email, password, name)

    try {
      // const response = await axios.post('http://localhost:5000/user/signup', {
      //   email,
      //   password,
      //   name,
      // })
      // console.log('This is response of handle signin ', response.data)
      setIsSingUp(true)
    } catch (error) {
      console.log('Error on signing in', error)
    }
  }

  return isSignUp ? (
    <Navigate to="/verify-otp" state={{ email: email }} />
  ) : (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
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

export default{ SignUpPage}
