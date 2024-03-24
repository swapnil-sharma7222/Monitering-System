const express = require('express');
const {sendOTP} = require('../controller/otpController');
const {sendotp,verifyotp}=require('../controller/otpsmsController')
const router = express.Router();
router.post('/send-otp', sendOTP);
router.post('/sendotp', sendotp);
router.post('/verify', verifyotp);
module.exports = router;