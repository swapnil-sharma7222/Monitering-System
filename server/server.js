const express = require('express')
const connectdb = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
connectdb()

require('dotenv').config()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use('/locality', require('./routes/userRoutes'))

app.use('/user', require('./routes/user2Routes'));
<<<<<<< HEAD
app.use('/user',require("./routes/otpRoutes"));
app.use("/accounts",require("./routes/forgetPassword"));
=======
app.use("/user",require('./routes/otpRoutes'));
app.use("/accounts",require('./routes/forgetPassword'));
app.use("/ivr-call", require('./routes/ivrCall'));
>>>>>>> d47964eba4b0430b7bf6500aeaa7ec26ab75df5e


app.listen(5000, () => {
  console.log('serving on port 3000....');
})
