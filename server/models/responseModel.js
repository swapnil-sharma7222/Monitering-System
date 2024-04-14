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
    type: Date, 
    default: Date.now(),
  }
});

const Responses = mongoose.model("Responses", AnswerSchema);
module.exports = Responses;
