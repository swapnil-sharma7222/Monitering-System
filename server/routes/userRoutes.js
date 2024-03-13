const express=require("express");
const router=express.Router();
const {getLocality,createLocality,updateLocality,deleteLocality}=require("../controller/localityController");
const validate = require("../middleware/validate");
router.use(validate);
router.route("/").get(getLocality).post(createLocality);
router.route("/:id").put(updateLocality).delete(deleteLocality);
module.exports=router;