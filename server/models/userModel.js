const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({

    name:
    {
        type: String,
        required: [true, "please add locality name"],
    },
    email:
    {
        type: String,
        required: [true, "please add email"],
        unique: [true, "please add unique email"],
        validate: [validator.isEmail, "please add valid email"],

    },
    password:
    {
        type: String,
        required: [true, "please add password"],
        minlenth: 8,
    },
    // passwordConfirm:
    // {
    //     type:String,
    //     required:[true,"please add password"],
    //     minlenth:8,
    //     validate: {
    //         validator: function (ele) {
    //             return this.password === ele;
    //         },
    //         message: 'Passwords do not match'
    //     }
    // }
    role: {
        type: String,
        enum: ['Admin', 'Student', 'Visitor']
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema);