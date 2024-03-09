const express = require("express");
const router = express.Router();
const {signup, signin } = require("../controller/userController");
router.route("/signup").post(signup);
router.route("/signin").post(signin);
console.log("Hello from user2Routes");
module.exports = router;
