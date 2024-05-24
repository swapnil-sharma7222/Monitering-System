const express = require("express");
const router = express.Router();
const { signup, signinwithEmail,signinwithPhoneNumber,totalUsers } = require("../controller/userController");
router.route("/signup").post(signup);
router.route("/signinwithEmail").post(signinwithEmail);
router.route("/signinwithPhoneNumber").post(signinwithPhoneNumber);
router.route("/totalUsers").get(totalUsers);
module.exports = router;
