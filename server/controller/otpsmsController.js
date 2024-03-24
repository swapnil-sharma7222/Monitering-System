// const {accountSid,TWILIO_AUTH_TOKEN,TWILIO_SERVICE_SID}=process.env;
const accountSid= process.env.accountSid;
const TWILIO_AUTH_TOKEN= process.env.TWILIO_AUTH_TOKEN;
const TWILIO_SERVICE_SID= process.env.TWILIO_SERVICE_SID;
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
            message: "something went wrong" + error.message,
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

