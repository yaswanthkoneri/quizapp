var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    questionNumber : Number,
    question: String,
    options: Array,
    answer: Array
})

QuestionSchema.statics.findByID = (id) => {
    return mongoose.model('Question').findById(id).then((result) => {
        console.log(result)
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

QuestionSchema.statics.patchQuestion = (id, qData) => {
    return new Promise((resolve, reject) => {
        mongoose.model('Question').findById(id, function (err, question) {
            if (err) reject(err);
            for (let i in qData) {
                question[i] = qData[i];
            }
            question.save(function (err, updatedQuestion) {
                if (err) return reject(err);
                resolve(updatedQuestion);
            });
        });
    })
};

QuestionSchema.statics.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        mongoose.model('Question').find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, questions) {
                if (err) {
                    reject(err);
                } else {
                    resolve(questions);
                }
            })
    });
};

QuestionSchema.statics.removeById = (qId) => {
    return new Promise((resolve, reject) => {
        mongoose.model('Question').remove({_id: qId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


module.exports = mongoose.model("Question", QuestionSchema);