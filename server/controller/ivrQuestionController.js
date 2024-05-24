const question = require('../models/questionModal');
const createQuestions = async (req, res) => {
  try {
    const excuses = req.body.excuses;
    const questions = await question.create({
      questionText: excuses,
    });
    console.log("The current questions are ", questions);
    return res.status(201).json({
      success: true,
      message: `Questions added to database on ${Date.now}`,
      data: questions,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Could not add questions to database",
    });
  }
}
module.exports = createQuestions;