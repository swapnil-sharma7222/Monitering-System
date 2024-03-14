const User= require('./../models/userModel');
const mailSender= require('./../utils/mailSender');
const forgetPassword=  async (req, res, next)=> {
  try {
    const { email } = req.body;
    const recoveryLink= `http://localhost:3000/${email}/new-password`;
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
            <p>The link expires in 5 minutes</p>`
          );
          console.log("Email sent successfully: ", mailResponse);
        } catch (error) {
          console.log("Error occurred while sending email: ", error);
          throw error;
        }
      }
      sendVerificationEmail(email);
  } catch (error) {
    
  }
}

module.exports= {forgetPassword};