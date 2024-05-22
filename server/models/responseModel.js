const mongoose = require("mongoose");
const AnswerSchema = new mongoose.Schema({
  phoneNumber: { 
    type: Number,
    required: true,
  },
  data: {
    type: [{
      type: Object,
      required: true,
  }],
  },
  addedAt: { 
    type: Date, 
    default: Date.now(),
  },
  locality: {
    type: String,
    required: true,
  }
});

const Responses = mongoose.model("Responses", AnswerSchema);
module.exports = Responses;
