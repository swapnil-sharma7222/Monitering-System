const User = require('./../models/userModel');
const mailSender = require('./../utils/mailSender');
// const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
// const  {clientURL} = process.env;
// const  ENCRYPTION_DECRYPTION_KEY, clientURL = process.env;

// Encryption function
function encrypt(data, key) {
  const encryptedData = CryptoJS.AES.encrypt(data, key).toString();
  return encryptedData;
}

// Decryption function
function decrypt(encryptedData, key) {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8);
  return decryptedData;
}

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Get the current timestamp in milliseconds
    const currentTime = Date.now();
    
    // Define the duration for the expiry (in milliseconds)
    const expiryDuration = 10 * 60 * 1000; // 2 min
    
    // Calculate the expiry timestamp by adding the duration to the current time
    let expiryTimestamp = currentTime + expiryDuration;
    // expiryTimestamp = encrypt(expiryDuration, process.env.ENCRYPTION_DECRYPTION_KEY);
    console.log(expiryTimestamp);
    //const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    const recoveryLink = `${process.env.serverURL}reset-password?email=${email}&expiryTime=${expiryTimestamp}`;
    console.log(recoveryLink);
    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });

    // If user found with provided email
    if (!checkUserPresent) {
      return res.status(501).json({
        success: false,
        message: 'Incorrect Email',
      });
    }

    async function sendVerificationEmail(email) {
      try {
        const mailResponse = await mailSender(
          email,
          "Email Recovery Link",
          `<h1>Click on the link below to reset you password</h1>
            <p>${recoveryLink}</p>
            <p>The link expires in 2 minutes</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
      } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
      }
    }
    sendVerificationEmail(email);
  } catch (error) {
    // console.warn(error);
    // console.error(error);
    return res.status(401).json({
      success: false,
      message: 'Internal Server Error.... Could not send you the password reset Email',
    });
  }
}

async function resetPassword(req, res) {
  // Example code to extract encrypted time from URL query parameter
  try {
    const encryptedTime = req.query.expiryTime;
    const userEmail = req.query.email;
    console.log(req.query);
  
    // Decrypt the encrypted time
    // const decryptedTime = decrypt(encryptedTime, ENCRYPTION_DECRYPTION_KEY);
    // console.log('Decrypted time:', decryptedTime);
    const decryptedTime= encryptedTime;
    const currentTime = Date.now();
    if (currentTime >= decryptedTime) {
      return res.status(503).json({
        status: 503,
        message: "The password link has expired. Please generate a new one"
      })
    }
  
    const { password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(505).json({
        status: 505,
        message: "The password does not match with confirm password"
      })
    }
  
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Hashing password error for ${password}: ` + error.message,
      });
    }
  
    const currentUser = User.findOneAndUpdate({ email: userEmail }, {
      $set: {
        password: hashedPassword
      }
    });
    console.log("The current User is ", currentUser);
    return res.status(201).json({
      success: true,
      message: "Password Updated....",
    });
  } 
  catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Could not update your password. Please try again",
    });
  }

}

module.exports = { forgetPassword, resetPassword };