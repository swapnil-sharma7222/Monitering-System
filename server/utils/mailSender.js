const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      // host: "smtp.gmail.com",
      port: 5000,
      secure: true,
      service : 'Gmail'
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: '2021uee1694@mnit.ac.in',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return;
  } catch (error) {
    console.log(error.message);
    throw new Error('Could not send email: ' + error.message);
  }
};

module.exports = mailSender;