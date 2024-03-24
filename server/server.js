const express = require('express')
const connectdb = require('./db');
const cors= require('cors');
const app = express()
app.use(cors())
app.use(express.json())
connectdb();

require('dotenv').config();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next();
})
app.use('/locality', require('./routes/userRoutes'))
app.use('/user', require('./routes/user2Routes'));
app.use('/user',require("./routes/otpRoutes"));
app.use("/accounts",require("./routes/forgetPassword"));


app.listen(5000, () => {
  console.log('servering on port 3000....')
})
