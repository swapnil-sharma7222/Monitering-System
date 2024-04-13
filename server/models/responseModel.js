const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  data: {
    type: [
      {
        type: Object,
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

responseSchema.pre("save", async function (next) {
  // Check if the date has changed
  if (this.isModified("date")) {
    try {
      // Get the model for the current date
      const currentDateModel = mongoose.model(
        `Data_${this.date.toDateString()}`,
        responseSchema
      );

      // Create a new document in the current date's collection
      await currentDateModel.create(this.toObject());

      // Delete the document from the main collection
      await this.constructor.findByIdAndDelete(this._id);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Responses = mongoose.model("Responses", responseSchema);
module.exports = Responses;
