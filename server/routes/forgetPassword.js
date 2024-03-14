const express = require('express');
const router = express.Router();
const {forgetPassword} = require('../controller/forgetPasswordController');

router.post('/forget-password', forgetPassword);

module.exports = router;