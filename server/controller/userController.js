const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
console.log("hello from controller");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      status: 'success',
      message: 'User registered successfully'
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'OOPss!!, there was some problem with user regiestering.... Please try again'
    })
  }

};
// const signin = async (req, res) => {
//     try {
//         console.log("hello from try");
//         const { email, password } = req.body;

//         if (!email || !password) {
//             res.status(400).json({ message: "Email and password are mandatory" });
//             return;
//         }
//         console.log("1");

//         const user = await User.findOne({ email });
//         console.log("2");

//         if (!user) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         if (user.password === password) {
//             res.status(201).json({
//                 data: user,
//                 message: `${user.name} signed in successfully`,
//             });
//         } else {
//             res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
};
module.exports = { signup, signin };
