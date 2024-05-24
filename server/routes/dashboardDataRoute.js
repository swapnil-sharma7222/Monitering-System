const express= require('express');
const router= express.Router();

const {getAllLocalUser, getQuestionForDashboard, getDates, getLocalities, getGraphData}= require('./../utils/dashboardData');

router.get('/date', getDates);
router.get('/locality', getLocalities);
router.get('/localUsers', getAllLocalUser);
router.post('/graphData', getGraphData);
router.post('/questions-for-dashboard', getQuestionForDashboard);

module.exports= router;