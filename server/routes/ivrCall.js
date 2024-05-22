const express= require('express');
const router= express.Router();
const {initiateCall, ivrMenu, handleUsersChoice, getAllResponses, getQuestions}= require('./../controller/ivrCallController');
const createQuestions= require('./../controller/ivrQuestionController');
router.post('/initiate', initiateCall);
router.post('/menu', ivrMenu);
router.post('/menu/handle-choice', handleUsersChoice);
router.get('/responses', getAllResponses);
router.get('/getQuestions', getQuestions);
router.post('/', createQuestions);

module.exports= router;