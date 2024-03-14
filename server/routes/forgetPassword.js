const express = require('express');
const router = express.Router();
const {forgetPassword, resetPassword} = require('../controller/forgetPasswordController');

router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

module.exports = router;