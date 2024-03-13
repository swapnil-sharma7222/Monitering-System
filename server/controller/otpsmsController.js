const {AUTH_SID,AUTH_TOKEN,SERVICE_ID}=process.env;
const client=require('twilio')(AUTH_TOKEN,AUTH_SID,{lazyLoading:true})

const sendotp=async(req,res,next)=>{
    const {number,code}=req.body;
    try{
        const otpResponse=await client.verify.v2.services({
            to: `+${code}${number}`,
            channel:"sms",
        });
        res.status(200).send(`OTP send successfully ${JSON.stringify(otpResponse)}`);
    } catch(error){
        res.status(400).json({
            success: false,
            message: "somenthing wne t erongz" + error.message,
          });
    }
};

const verifyotp=async (req,res,next)=>{
    const {number,code,otp}=req.bodyl
    try{
        const verifiedResponse=await client.verify.v2.services(SERVICE_ID).verifications.create({
            to:`+${code}${number}`,
            code:otp,
        })
        res.status(200).send(`OTP verified successfully ${JSON.stringify(verifiedResponse)}`);

    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "somenthing wne t erongz" + error.message,
          });
    }
}
module.exports={sendotp};

// require('dotenv').config();
// const axios = require('axios');
// const sendotp=async(post('/send-otp', async (req, res) => {
//   try {
//     const {mobileNumber} = req.body;
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const response = await axios.get('https://www.fast2sms.com/dev/bulk', {
//       params: {
//         authorization: process.env.FAST2SMS_API_KEY,
//         variables_values: `Your OTP is ${otp}`,
//         route: 'otp',
//         numbers: mobileNumber
//       }
//     });
//     res.json({ success: true, message: 'OTP sent successfully!' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ success: false, message: 'Failed to send OTP.' });
//   }
// }));


// const otpStore = {};

// const verifyotp=async(post('/verify-otp', (req, res) => {
//   const { mobileNumber, otp } = req.body;

//   // Check if the mobile number exists in the OTP store
//   if (otpStore.hasOwnProperty(mobileNumber)) {
//     // Get the stored OTP and its expiration time
//     const { storedOTP, expirationTime } = otpStore[mobileNumber];

//     // Verify the OTP and check if it's not expired
//     if (storedOTP === otp && Date.now() < expirationTime) {
//       // OTP verification successful
//       res.json({ success: true, message: 'OTP verification successful!' });
//     } else {
//       // Invalid OTP or expired OTP
//       res.status(400).json({ success: false, message: 'Invalid OTP.' });
//     }
//   } else {
//     // Mobile number not found or OTP expired
//     res.status(400).json({ success: false, message: 'Mobile number not found or OTP expired.' });
//   }
// })
// )
// ;