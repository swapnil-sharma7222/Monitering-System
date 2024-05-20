const twilio = require('twilio');
const Responses = require('./../models/responseModel');
const Questions = require('./../models/questionModal');
const getQuestions = require('./../utils/getQuestions');
const getAllResponses = require('./../utils/getAllResponses');
const getAllUsers = require('../utils/getAllUsersWithGivenLocality');
const { Gather } = require('twilio/lib/twiml/VoiceResponse');

// Twilio configurations
const accountSid = process.env.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Create a Twilio client
const client = new twilio(accountSid, authToken);
let phoneNumber;
let data;
let localityToCall;
let flag = true;
let messages;
let n;
// Define routes and controllers
// Endpoint to initiate the IVR call
const initiateCall = async (req, res) => {
  try {
    if(flag){
      messages= await getQuestions();
      n= messages.length;
      flag= false;
    }
    const { locality } = req.body; // Locality to call
    localityToCall = locality;
    const phoneNumbersToCall = await getAllUsers(localityToCall);
    console.log('These are the phone Numbers to call upon', phoneNumbersToCall);

    // Function to make calls with interval
    const makeCalls = (numbers, index) => {
      if (index >= numbers.length) return;

      data= new Array(n).fill(0);
      let to = numbers[index];
      to= "+91"+ to;
      client.calls.create({
        url: 'https://8f7c-2409-40d4-100c-5bb4-2841-3ac9-a8fe-68e7.ngrok-free.app/ivr-call/menu',
        to: to,
        from: twilioPhoneNumber
      }).then(call => {
        console.log(`Call initiated with SID: ${call.sid}`);
      }).catch(error => {
        console.error(`Error in initiating call to ${to}: ${error.message}`);
      });

      // Set interval to call next number after 10 seconds
      setTimeout(() => {
        makeCalls(numbers, index + 1);
      }, 5000); // 5000ms = 5 seconds
    };

    // Start making calls
    makeCalls(phoneNumbersToCall, 0);

    res.status(200).json({
      message: "Calls are being initiated",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error in initiating the calls"
    });
  }
  flag= true;
};
// const initiateCall = async (req, res) => {
//   try {
//     messages = await getQuestions();
//     n = messages.length;

//     const { to } = req.body; // Phone number to call
//     // const { locality } = req.body; // Locality to call
//     // localityToCall= locality;
//     // const phoneNumbersToCall= getAllUsers(localityToCall);
//     phoneNumber = to;
//     data = [0, 0, 0, 0, 0, 0];
//     const call = await client.calls.create({
//       url: 'https://8f7c-2409-40d4-100c-5bb4-2841-3ac9-a8fe-68e7.ngrok-free.app/ivr-call/menu',
//       to: to,
//       from: twilioPhoneNumber
//     });

//     res.json(call.sid);
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//       message: "Error in initiating the call"
//     });
//   }
// };

// IVR menu endpoint
const ivrMenu = async (req, res) => {
  try {
    const twiml = new twilio.twiml.VoiceResponse();
    // Welcome message
    // twiml.say("नमस्ते, हमारी कॉल का उत्तर देने के लिए धन्यवाद। यह सुभाषिनी का एनजीओ है, जो यह सुनिश्चित करने के लिए पहुंच रहा है कि आपको आवश्यक सहायता मिले।");
    twiml.say("hello subhashini");

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
async function askQuestion(twiml, questionNumber, attempts) {
  console.log(`Hello from askQuestion and this is question number ${questionNumber}`);
  // const maxAttempts = 3; // Maximum number of attempts before moving to the next question
  // if (attempts >= maxAttempts) {
  //   if (attempts === 0) {
  //     data.push(0);
  //   }
  //   moveNextQuestion(twiml, questionNumber + 1);
  //   return;
  // }

  // if (attempts > 0) {
  //   twiml.say('Invalid number selected. Please try again.');
  // }

  // const gather = twiml.gather({
  //   input: 'dtmf',
  //   numDigits: 1,
  //   action: `/ivr-call/menu/handle-choice?q=${questionNumber}`
  // });

  // switch (questionNumber) {
  //   case 1:
  //     gather.say('press one if you receive the breakfast, press 2 if you did not received it');
  //     break;
  //   case 2:
  //     gather.say('press one if the quantity of the breakfast was enough, press 2 if it was not enough');
  //     break;
  //   case 3:
  //     gather.say('press one if you receive the lunch, press 2 if you did not received it');
  //     break;
  //   case 4:
  //     gather.say('press one if the quantity of the lunch was enough, press 2 if it was not enough');
  //     break;
  //   case 5:
  //     gather.say('press one if you receive the dinner, press 2 if you did not received it');
  //     break;
  //   case 6:
  //     gather.say('press one if the quantity of the dinner was enough, press 2 if it was not enough');
  //     break;
  // }
  // Define an array of messages for each question
  // const messages = [
  //   'press one if you receive the breakfast, press 2 if you did not receive it',
  //   'press one if the quantity of the breakfast was enough, press 2 if it was not enough',
  //   'press one if you receive the lunch, press 2 if you did not receive it',
  //   'press one if the quantity of the lunch was enough, press 2 if it was not enough',
  //   'press one if you receive the dinner, press 2 if you did not receive it',
  //   'press one if the quantity of the dinner was enough, press 2 if it was not enough'
  // ];
  // const messages= getQuestions();
  // n= messages.length;
  // console.log(messages);
  const gather = twiml.gather({
    input: 'dtmf',
    numDigits: 1,
    action: `/ivr-call/menu/handle-choice?q=${questionNumber}`
  });
  gather.say(messages[questionNumber - 1]);

  // If no input is received, repeat the question
  twiml.redirect(`/ivr-call/menu?q=${questionNumber}`);
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
        data[questionNumber - 1] = 1;
        break;
      case '2':
        twiml.say('You selected option two.');
        // Add logic for option two
        // data.push(2);
        data[questionNumber - 1] = 2;
        break;
      default:
        askQuestion(twiml, questionNumber, 1); // Repeat the question
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


module.exports = { initiateCall, ivrMenu, handleUsersChoice, getAllResponses, getQuestions };
