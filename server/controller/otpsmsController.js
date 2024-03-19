const {accountSid,TWILIO_AUTH_TOKEN,TWILIO_SERVICE_SID}=process.env;
const client=require('twilio')(accountSid,TWILIO_AUTH_TOKEN,{lazyLoading:true})

const sendotp= async (req,res,next)=>{
    const {number,countryCode}=req.body;
    try{
        const otpResponse=await client.verify.v2.services(TWILIO_SERVICE_SID).verifications.create({
            to: `+${countryCode}${number}`,
            channel:"sms",
        });
        res.status(200).send(`OTP send successfully ${JSON.stringify(otpResponse)}`);
    } catch(error){
        res.status(400).json({
            success: false,
            message: "somenthing went wrong" + error.message,
          });
    }
};

const verifyotp= async (req,res,next)=>{
    const {number,countryCode,otp}= req.body;
    try{
        const verifiedResponse=await client
        .verify
        .v2
        .services(TWILIO_SERVICE_SID)
        .verificationChecks
        .create({
            to:`+${countryCode}${number}`,
            code:otp,
        });
        res.redirect('/')
        .status(200)
        .send(`OTP verified successfully ${JSON.stringify(verifiedResponse)}`);

    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "Something went wrong " + error.message,
          });
    }
}
module.exports={sendotp,verifyotp};

