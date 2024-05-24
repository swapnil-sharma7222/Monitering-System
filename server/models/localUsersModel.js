const mongoose= require('mongoose');
const validator= require('validator');

const schema= new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please provide a number'],
  },
  localityName: {
    type: String,
    required: [true, 'Please provide name of the locality'],
  }
});

module.exports= mongoose.model('LocalUsers', schema);