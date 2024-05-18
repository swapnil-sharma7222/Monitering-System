const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: [String],
    required: true,
  },
  addedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Questions = mongoose.model("Questions", QuestionSchema);
module.exports = Questions;
