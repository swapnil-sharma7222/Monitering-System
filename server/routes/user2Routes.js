const express = require("express");
const router = express.Router();
const { signup, signinwithEmail,signinwithPhoneNumber } = require("../controller/userController");
router.route("/signup").post(signup);
router.route("/signinwithEmail").post(signinwithEmail);
router.route("/signinwithPhoneNumber").post(signinwithPhoneNumber);
module.exports = router;
