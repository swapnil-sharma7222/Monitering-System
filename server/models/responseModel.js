const mongoose = require("mongoose");
const AnswerSchema = new mongoose.Schema({
  phoneNumber: { 
    type: Number,
  },
  data: {
    type: [{
      type: Object,
      required: true,
  }],
  },
  addedAt: { 
    type: String, 
    
  }
});

const Responses = mongoose.model("Responses", AnswerSchema);
module.exports = Responses;
