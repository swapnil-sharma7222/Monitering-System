const express= require('express');
const router= express.Router();
const validate= require('./../middleware/validate');

const addNewLocals= require('./../controller/registerNewUserController');
router.post('/',validate, addNewLocals);

module.exports= router;