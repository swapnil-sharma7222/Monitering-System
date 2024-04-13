const express= require('express');
const router= express.Router();
const {initiateCall, ivrMenu, handleUsersChoice, getAllResponses}= require('./../controller/ivrCallController');
router.post('/initiate', initiateCall);
router.post('/menu', ivrMenu);
router.post('/menu/handle-choice', handleUsersChoice);
router.get('/responses', getAllResponses);

module.exports= router;