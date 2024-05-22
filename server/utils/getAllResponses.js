const Responses = require('./../models/responseModel');
const responsesToGraph= require('./responsesToGraph');

async function getAllResponses(req, res) {
  const { date } = req.body;
  const dateToQuery = new Date(date); // Set the date you want to query
  // console.log(dateToQuery);

  // Calculate the start and end of the specified date
  const startOfDay = new Date(dateToQuery);
  startOfDay.setHours(0, 0, 0, 0); // Set time to the start of the day (00:00:00)
  // console.log(startOfDay);

  const endOfDay = new Date(dateToQuery);
  endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day (23:59:59.999)
  // console.log(endOfDay);


  // Define the query criteria to find documents within the specified date range
  const query = {
    addedAt: {
      $gte: startOfDay, // Greater than or equal to the start of the day
      $lt: endOfDay,   // Less than  the end of the day
    },
  };
  try {
    const response = await Responses.find(query);
    const inputToGraph= responsesToGraph(response);
    return res.status(200).json({ inputToGraph });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      message: "Error in retrieving responses"
    });
  }
  //console.log(inputToGraph);
}

module.exports= getAllResponses;