const express= require('express');
const router= express.Router();
const validate= require('./../middleware/validate');

const addNewLocals= require('./../controller/registerNewUserController');
router.post('/', addNewLocals);

module.exports= router;