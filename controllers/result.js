var Question = require('../models/question')
var Result = require('../models/results');
function ResultController (){

}

ResultController.prototype.createResult = (req,res)=>{
    var r = new Result({email:req.body.email})
    r.save((err)=>{
        if (err){
            res.send(err);
            return;
        }
        res.status(200).send("success")
    })
}

ResultController.prototype.updateResult = (req,res)=>{
    Question.findOne({'questionNumber':req.body.questionNumber}).then((qresult)=>{
        var a= new Set(qresult.answer);
        if (a.has(req.body.answer)){
            Result.findOneAndUpdate({'email':req.body.email},{$inc:{score:1}},{new:true}).then((result)=>{
                if (result){
                    res.send(result);
                }
                else {
                   res.status(400).send({message:`something went wrong`})
                }
            })
        }
        else {
            res.send({"status":"failed"})
        }
    })
}

ResultController.prototype.getLeaderboard = (req,res)=>{
    Result.find({}).sort([['score', 'descending']]).exec().then((qresult)=>{
    res.send(qresult);
    }).catch((err)=>{
        if (err){
            res.send(err);
            return;
        } 
    })
}

ResultController.prototype.getResultById = (req,res)=>{
    Result.findById(req.params.id).then((qresult)=>{
    res.send(qresult);
    }).catch((err)=>{
        if (err){
            res.send(err);
            return;
        } 
    })
}

ResultController.prototype.getResultById = (req,res)=>{
    Result.findByIdAndRemove(req.params.id).then((qresult)=>{
    res.send(qresult);
    }).catch((err)=>{
        if (err){
            res.send(err);
            return;
        } 
    })
}




var resultController = new ResultController()
module.exports = resultController;