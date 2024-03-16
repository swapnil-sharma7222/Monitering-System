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

const Locality = require('./models/localityModels')
// app.post('/locality', async (req, res) => {
//   try {
//     console.log('Request Body1: ', req.body)
//     console.log(req.body.name)
//     const { name } = req.body
//     console.log(name)
//     if (!name) {
//       res.status(400).json({ error: 'Name is required' })
//       return
//     }
//     const contact = await Locality.create({ name })
//     console.log('Request Body:', req.body)
//     return res.status(201).json({
//       data: contact,
//     });
//     // return res.status(201).json({ error: 'Internal Server Erroredtruyfkh' })
//   } catch (error) {
//     console.error('Error creating locality:', error)
//     return res.status(500).json({ error: 'Internal Server Error' })
//   }
// })
const router  = require('./routes/userRoutes')
app.use("/locality", router);
// // app.post('/locality', async (req, res)=>{
// //     try {
// //       console.log('Request Body1: ', req.body)
// //       const { name } = req.body
// //       if (!name) {
// //         res.status(400).json({ error: 'Name is required' })
// //         return
// //       }
// //       const contact = await Locality.create({ name });
// //       console.log('Request Body:', req.body)
// //       res.status(201).json(contact);
// //     } catch (error) {
// //       console.error('Error creating locality:', error)
// //       res.status(500).json({ error: 'Internal Server Error' })
// //     }
// // })
// app.use("/user",require("./routes/user2Routes"));
// app.use("/user",require("./routes/otpRoutes"));

app.listen(5000, () => {
  console.log('serving on port 5000....')
})
