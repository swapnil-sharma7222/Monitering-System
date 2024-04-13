import React, { useState } from 'react';
import axios, { Axios } from 'axios'
import './ResetPasswordPage.css'
export const ResetPasswordPage = () => {
  const [email, setEmail]= useState('');
  const sendRestPasswordLink= async (e)=> {
    e.preventDefault();
    try {
      const response= await axios.post(`http://localhost:5000/accounts/forget-password`, {
        email: email,
      });
      console.warn(await response.data);
      console.log(await response.data);
      console.error(response);
    } catch (error) {
      console.error('this is the error:', error)
    }
  }
  return (
    <html>
      <body>
        <div className="container">
          <div className="image-wapper" style={{ backgroundImage: "url(https://st.depositphotos.com/2209782/2833/i/600/depositphotos_28336025-stock-photo-clothes-on-a-rack.jpg)" }}>
            <h1>Restore Account</h1>
          </div>
          <div className="form-wapper">
            <div className="form-header">
              <h2>Forgot Password?</h2>
              <p>Enter your email and we'll send you instructions to reset your password.</p>
            </div>
            <div className="form-body">
              <form>
                <div className="input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" placeholder="john@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <button type="submit" onClick={sendRestPasswordLink}>Send Reset Link</button>
              </form>
            </div>
            <div className="form-footer">
              <p>
                <span className="icon">
                  <i className="fi-rr-angle-small-left"></i>
                </span>
                <a className="form-link" to="/signup">Back To Login</a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
