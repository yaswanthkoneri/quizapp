var fs = require('fs');
var Question = require('../models/question')
var path = require('path');

function QuestionController (){

}

QuestionController.prototype.defaultQuestions = (req,res)=>{
    fs.readFile(path.join(__dirname,'../data/questions.json'),"utf8",function(err,data){
        if (err){
            console.error(err);
            return;
        }
        data=JSON.parse(data)
        data.questions.forEach((element,index)=>{
            var q = new Question({
                questionNumber : index,
                question : element.text,
                options : element.answers,
                answer : element.correct_answer
            })
            q.save();
        })
       res.json({"status":"success"})
    })
}

QuestionController.prototype.createQuestion = (req,res)=>{
    var q = new Question({
        questionNumber : req.body.questionNumber,
        question : req.body.text,
        options : req.body.answers,
        answer : req.body.correct_answer
    })
    q.save((err)=>{
        if (err){
            res.send(err);
            return;
        }
        res.status(200).send("success")
    })
}

QuestionController.prototype.getQuestions = (req,res)=>{
   let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
   let page = 0;
   if (req.query) {
       if (req.query.page) {
           req.query.page = parseInt(req.query.page);
           page = Number.isInteger(req.query.page) ? req.query.page : 0;
       }
   }
   Question.list(limit, page).then((result) => {
       res.status(200).send(result);
   })
}

QuestionController.prototype.getQuestionById = (req,res)=>{
    Question.findByID(req.params.id).then((result)=>{
        res.status(200).send(result);
    })
}

QuestionController.prototype.updateQuestionById = (req,res)=>{
    Question.patchQuestion(req.params.id,req.body).then((result)=>{
        res.status(204).send(result)
    })
}

QuestionController.prototype.removeQuestion = (req,res)=>{
    Question.findByIdAndRemove(req.params.id).then((result)=>{
        if (result===null){
            console.log("Could not Find Document");
            res.status(400).send({status:"failed",message:"Couldnot find Document",document:result})
        }
        res.status(200).send({status:"success",message:"Deleted Successfully",document:result})
    })
}


Question.createUser = (qData) => {
    const user = new Question(qData);
    return user.save();
};


var questionController = new QuestionController();
module.exports = questionController;