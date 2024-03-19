import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCustom } from '../context/context'
export const Otp = () => {
  const [otp, setOtp] = useState('')
  const { email } = useCustom()
  useEffect(() => {
    console.log(email)
    fetchOtp()
  }, [])

  const fetchOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/send-otp', {
        email: email,
      })
      console.log(response)
    } catch (error) {
      console.error('this is the error:', error)
    }
  }
  const handleOTPChange = (e) => {
    setOtp(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios
    } catch (error) {}
  }
  console.log(email)
  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={handleOTPChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
