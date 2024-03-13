import React, { useState } from 'react'
import axios from 'axios'
import { Link, Navigate, redirect } from 'react-router-dom'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const[isSignUp,setIsSingUp]=useState(false)

  const handleEmailChange = (e) => {
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
      const response = await axios.post('http://localhost:5000/user/signup', {
        email,
        password,
        name,
      })
      console.log('This is response of handle signin ', response.data)
      setIsSingUp(true);
      
    } catch (error) {
      console.log('Error on signing in', error)
    }
  }

  return (
    isSignUp?<Navigate to="/admin"/>:<form onSubmit={handleSubmit}>
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
      <div>y
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

export default SignUpPage
