const Locality = require('../models/localityModels')
const asynchandler = require('express-async-handler')

const getLocality = asynchandler(async (req, res) => {
  try {
    const contacts = await Locality.find()
    console.log(contacts.length)
    res.status(200).json({ message: 'get the locality' })
  } catch (error) {
    console.error('Error in getting locality list:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

const createLocality = async (req, res) => {
  try {
    console.log('Request Body1: ', req.body)
    console.log(req.body.name)
    const { name } = req.body
    console.log(name)
    if (!name) {
      res.status(400).json({ error: 'Name is required' })
      return;
    }
    const contact = await Locality.create({ name })
    console.log('Request Body:', req.body)
    return res.status(201).json({
      data: contact,
    })
    // return res.status(201);
  } catch (error) {
    console.error('Error creating locality:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateLocality = asynchandler(async (req, res) => {
  // const contact=await Contact.findById(req.params.id);
  //const updatedcontact=await Contact.findByIdAndUpdate(
  //     req.params.id,
  //     req.body,
  //     { new :true}
  //    );
  try {
    res.status(200).json({ message: `update locality for ${req.params.id}` })
  } catch (error) {
    console.error('Error updating  locality:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
const deleteLocality = asynchandler(async (req, res) => {
  try {
    res.status(200).json({ message: `delete locality for ${req.params.id}` })
  } catch (error) {
    console.error('Error deleting locality:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = {
  getLocality,
  createLocality,
  updateLocality,
  deleteLocality,
}
