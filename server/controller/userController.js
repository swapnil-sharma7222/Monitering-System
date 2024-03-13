const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    console.log('Hashed Password: ', hashedPassword)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    res.status(200).json({
      status: 'success',
      message: 'User registered successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'failed',
      message:
        'OOPss!!, there was some problem with user regiestering.... Please try again',
    })
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400)
      throw new Error('All fields are mandatory!')
    }
    const user = await User.findOne({ email })
    //compare password with hashedpassword
    console.log(user)
    console.log('This is access token', process.env.ACCESS_TOKEN_SECRET)
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )
      res.status(200).json({ accessToken })
    } else {
      res.status(401)
      throw new Error('Email or password is not valid')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = { signup, signin }
