const question= require('../models/questionModal');
const createQuestions=async (req,res)=>{
    const {excuses}=req.body.excuses;
    console.log(excuses);
    const questions = await question.create(
        {
            questionText: excuses,

        }
    )
}
module.exports=createQuestions;