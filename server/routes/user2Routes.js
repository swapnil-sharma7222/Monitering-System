const express = require("express");
const router = express.Router();
const {signup, 
       signin ,
       current} = require("../controller/userController");
const validate = require("../middleware/validate");
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/").get(validate,current);
console.log("Hello from user2Routes");
module.exports = router;
