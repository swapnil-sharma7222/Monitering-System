const Questions = require('./../models/questionModal');

const getQuestions = async () => {
  try {
    // Get current date
    const currentDate = new Date();
    // console.log('this is current date', currentDate);

    // Set start of the day
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);

    // Set end of the day
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

    // Construct query to find documents with date field within today's range
    const query = {
      addedAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    };
    // console.log('this is the query', query);

    const response = await Questions.find(query);
    const questionsToSay = response[0].questionText;
    return questionsToSay;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}
// getQuestions().then(messages => {
//     return messages; // Return the array if needed elsewhere in your code
//   }).catch(err => {
//     console.error('Error:', err);
//   });

module.exports = getQuestions;