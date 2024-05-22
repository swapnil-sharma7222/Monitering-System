const Locality = require('../models/localityModels');
const LocalUsers = require('../models/localUsersModel');
const Questions = require('./../models/questionModal');
const getAllResponses = require('./getAllResponses');

async function getAllLocalUser() {
  try {
    const response = await LocalUsers.countDocuments();
    return response;
  } catch (e) {
    console.error(e);
    throw new e;
  }
}

async function getAllLocality() {
  try {
    const response = await Locality.countDocuments();
    return response;
  } catch (e) {
    console.error(e);
    throw new e;
  }
}

const getDates = async (req, res) => {
  try {
    const dates = await Questions.distinct('addedAt');
    const dateParts = dates.map(date => date.toISOString().split('T')[0]);

    return res.json({ dateParts });
  } catch (error) {
    console.error('Error fetching dates:', error);
    return []; // Return an empty array in case of an error
  }
};

const getLocalities = async (req, res) => {
  try {
    const localities = await Locality.find({}, 'name'); // Only retrieve the 'name' field
    const data = localities.map((doc) => {
      return doc.name;
    });
    return res.json({ data });
  } catch (error) {
    console.error('Error fetching localities:', error);
    return []; // Return an empty array in case of an error
  }
};

const getQuestionForDashboard = async (req, res) => {
  try {
    const { date, locality } = req.body;
    const dateToQuery = new Date(date); // Set the date you want to query

    // Calculate the start and end of the specified date
    const startOfDay = new Date(dateToQuery);
    startOfDay.setHours(0, 0, 0, 0); // Set time to the start of the day (00:00:00)

    const endOfDay = new Date(dateToQuery);
    endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day (23:59:59.999)

    // Define the query criteria to find documents within the specified date range
    const query = {
      addedAt: {
        $gte: startOfDay, // Greater than or equal to the start of the day
        $lt: endOfDay,   // Less than  the end of the day
      },
      locality: locality,
    };

    const responses = await Questions.find(query);
    const data = responses.map((response) => {
      return response.questionText;
    });
    res.json({ data });
  } catch (err) {
    console.error('Error fetching questions:', err);
    return []; // Return an empty array in case of an error
  }
}
const getGraphData = (req, res) => {
  return getAllResponses(req, res);
}

module.exports = { getAllLocalUser, getAllLocality, getDates, getLocalities, getGraphData, getQuestionForDashboard };