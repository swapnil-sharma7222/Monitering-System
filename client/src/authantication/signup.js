// import React, { useContext, useState } from 'react'
// import axios from 'axios'
// import { Link, Navigate, redirect } from 'react-router-dom'
// import { useCustom } from '../context/context'

// const SignUpPage = () => {
//   const { email, setEmail, name, setName } = useCustom()
//   const [password, setPassword] = useState('')
//   const [isSignUp, setIsSingUp] = useState(false)

//   const handleEmailChange = (e) => {
//     //console.log(e.target.value)
//     setEmail(e.target.value)
//   }
//   const handleNameChange = (e) => {
//     setName(e.target.value)
//   }

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     // Handle the sign-in logic here
//     console.log('Signing up with:', email, password, name)

//     try {
//       // const response = await axios.post('http://localhost:5000/user/signup', {
//       //   email,
//       //   password,
//       //   name,
//       // })
//       // console.log('This is response of handle signin ', response.data)
//       setIsSingUp(true)
//     } catch (error) {
//       console.log('Error on signing in', error)
//     }
//   }

//   return isSignUp ? (
//     <Navigate to="/verify-otp" state={{ email: email }} />
//   ) : (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="Name"
//           value={name}
//           onChange={handleNameChange}
//           required
//         />
//       </div>
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

// export default{ SignUpPage}

import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, redirect } from 'react-router-dom'
import { useCustom } from '../context/context'
function SignUpForm() {
  const { email, setEmail, name, setName, mobileNo, setMobileNo } = useCustom()
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
  const handleNumberChange = (e) => {
    setMobileNo(e.target.value)
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
      setIsSingUp(true)
    } catch (error) {
      console.log('Error on signing in', error)
    }
  }
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          autoComplete="off"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          autoComplete="off"
        />
        <input
          type="text"
          name="phone number"
          value={mobileNo}
          onChange={handleNumberChange}
          placeholder="phoneNumber"
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          autoComplete="off"
        />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
