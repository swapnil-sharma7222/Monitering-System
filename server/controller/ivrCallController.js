const twilio = require('twilio');
const Responses = require('./../models/responseModel');
const responsesToGraph= require('./../utils/responsesToGraph');
const { Gather } = require('twilio/lib/twiml/VoiceResponse');

// Twilio configurations
const accountSid = process.env.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Create a Twilio client
const client = new twilio(accountSid, authToken);
const dataFromFrontend=async(req,res)=>{
  let n;
  n=req.body.noOfQuestions;
  let message;
  message=req.body.message;
}
let phoneNumber;
let data=Array(n).fill(0);

// Define routes and controllers
// Endpoint to initiate the IVR call
const initiateCall = async (req, res) => {
  try {
    const { to } = req.body; // Phone number to call
    phoneNumber = to;
    data = Array(n).fill(0);
    const call = await client.calls.create({
      url: 'https://2c7d-14-139-226-3.ngrok-free.app/ivr-call/menu',
      to: to,
      from: twilioPhoneNumber
    });

    res.json(call.sid);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error in initiating the call"
    });
  }
};

// IVR menu endpoint
const ivrMenu = async (req, res) => {
  try {
    const twiml = new twilio.twiml.VoiceResponse();
    // Welcome message
    twiml.say("नमस्ते, हमारी कॉल का उत्तर देने के लिए धन्यवाद। यह सुभाषिनी का एनजीओ है, जो यह सुनिश्चित करने के लिए पहुंच रहा है कि आपको आवश्यक सहायता मिले।");

    // Ask the first question
    askQuestion(twiml, 1, 0);

    res.send(twiml.toString());
  } catch (error) {
    res.status(500).json({
      message: "Error in menu section of the call",
      error: error.message,
    });
  }
};

// Function to ask a question
const maxAttempts = 3; // Maximum number of attempts before moving to the next question
async function askQuestion(twiml, questionNumber, attempts) {
 /// console.log(`Hello from askQuestion and this is ${questionNumber}`);
  if (attempts >= maxAttempts) {
    if (attempts === 0) {
      data.push(0);
    }
    moveNextQuestion(twiml, questionNumber + 1);
    return;
  }

  if (attempts > 0) {
    twiml.say('Invalid number selected. Please try again.');
  }
// const messages = [
//   'press one if you receive the breakfast, press 2 if you did not receive it',
//   'press one if the quantity of the breakfast was enough, press 2 if it was not enough',
//   'press one if you receive the lunch, press 2 if you did not receive it',
//   'press one if the quantity of the lunch was enough, press 2 if it was not enough',
//   'press one if you receive the dinner, press 2 if you did not receive it',
//   'press one if the quantity of the dinner was enough, press 2 if it was not enough'
// ];
const gather = twiml.gather({
  input: 'dtmf',
  numDigits: 1,
  action: `/ivr-call/menu/handle-choice?q=${questionNumber}`
});
gather.say(messages[questionNumber- 1]);
// Loop through the messages array and use gather.say to speak each message
// while (questionNumber<= n) {
//   gather.say(messages[questionNumber - 1]); // Array is 0-indexed, so we subtract 1 from questionNumber
// }
  // If no input is received, repeat the question
  twiml.redirect(`/ivr-call/menu?q=${questionNumber}`);
  // askQuestion(twiml, questionNumber, attempts+ 1);
}

// IVR menu choice handling endpoint
const handleUsersChoice = async (req, res) => {
  try {
    const twiml = new twilio.twiml.VoiceResponse();
    
    const choice = req.body.Digits;
    const questionNumber = parseInt(req.query.q);
    
    switch (choice) {
      case '1':
        twiml.say('You selected option one.');
        // Add logic for option one
        // data.push(1);
        data[questionNumber- 1]= 1;
        break;
      case '2':
        twiml.say('You selected option two.');
        // Add logic for option two
        // data.push(2);
        data[questionNumber- 1]= 2;
        break;
      default:
        askQuestion(twiml, questionNumber, attempts+1); // Repeat the question
        break;
    }

    // if(choice== '2' && questionNumber%2== 1)  moveNextQuestion(twiml, questionNumber + 2);
    // else moveNextQuestion(twiml, questionNumber + 1);
    moveNextQuestion(twiml, questionNumber + 1);
    res.send(twiml.toString());
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error in handling user's choices on the call"
    });
  }
};

// Function to move to the next question
async function moveNextQuestion(twiml, nextQuestionNumber) {
  if (nextQuestionNumber <= n) {
    // If there are more questions, ask the next question
    askQuestion(twiml, nextQuestionNumber, 0);
  } else {
    // If all questions are done, say farewell message and hang up
    twiml.say('Thank you for your time. Goodbye!');
    twiml.hangup();
    try {
      const newResponse = await Responses.create({
        phoneNumber,
        data,
      });
      console.log(newResponse);
    } catch (err) {
      console.error(err);
    }
  }
}

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
}
module.exports = { initiateCall, ivrMenu, handleUsersChoice, getAllResponses ,dataFromFrontend};
