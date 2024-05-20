const mongoose = require("mongoose");

const localitySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add locality name"],
  },
  phoneNumber:[{
    type: Number,
  }
  ]
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Locality", localitySchema);