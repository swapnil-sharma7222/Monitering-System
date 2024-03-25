const twilio = require('twilio');
const Responses= require('./../models/responseModel');

// Twilio configurations
const accountSid = process.env.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Create a Twilio client
const client = new twilio(accountSid, authToken);
let phoneNumber; 
let data= [];
// Define routes and controllers

// Endpoint to initiate the IVR call
const initiateCall = async (req, res) => {
  try {
    const { to } = req.body; // Phone number to call
    phoneNumber= to;
    const call = await client.calls.create({
      url: 'https://c663-2409-40d4-205e-2609-84a0-b4e7-43e4-285.ngrok-free.app/ivr-call/menu',
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
const ivrMenu = (req, res) => {
  try {
    const twiml = new twilio.twiml.VoiceResponse();

    // Welcome message
    twiml.say('Welcome to our IVR system.');

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
function askQuestion(twiml, questionNumber, attempts) {
  const maxAttempts = 3; // Maximum number of attempts before moving to the next question

  if (attempts >= maxAttempts) {
    // Move to the next question
    data.push(0);
    moveNextQuestion(twiml, questionNumber + 1);
    return;
  }

  if (attempts > 0) {
    twiml.say('Invalid number selected. Please try again.');
  }

  const gather = twiml.gather({
    input: 'dtmf',
    numDigits: 1,
    action: `/ivr-call/menu/handle-choice?q=${questionNumber}`
  });

  switch (questionNumber) {
    case 1:
      gather.say('Press 1 for option one, Press 2 for option two.');
      break;
    case 2:
      gather.say('Press 1 for option three, Press 2 for option four.');
      break;
    case 3:
      gather.say('Press 1 for option five, Press 2 for option six.');
      break;
    // Add more cases for additional questions as needed
  }

  // If no input is received, repeat the question
  // twiml.redirect(`/ivr-call/menu?q=${questionNumber}`);
  askQuestion(twiml, questionNumber, attempts+ 1);
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
        data.push(1);
        break;
      case '2':
        twiml.say('You selected option two.');
        // Add logic for option two
        data.push(2);
        break;
      default:
        askQuestion(twiml, questionNumber, 1); // Repeat the question
        break;
    }

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
function moveNextQuestion(twiml, nextQuestionNumber) {
  if (nextQuestionNumber <= 3) {
    // If there are more questions, ask the next question
    askQuestion(twiml, nextQuestionNumber, 0);
  } else {
    // If all questions are done, say farewell message and hang up
    twiml.say('Thank you for your time. Goodbye!');
    
    twiml.hangup();
  }
}

module.exports = { initiateCall, ivrMenu, handleUsersChoice };
