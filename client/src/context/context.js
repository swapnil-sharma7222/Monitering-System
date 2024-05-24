import React, { createContext, useState, useContext } from 'react'

const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [password, setPassword] = useState('')
  return (
    <StateContext.Provider
      value={{
        email,
        setEmail,
        name,
        setName,
        mobileNo,
        setMobileNo,
        password,
        setPassword,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
export const useCustom = () => {
  return useContext(StateContext)
}
