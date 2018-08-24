const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResultSchema = new Schema({
    email: String,
    score: {type:Number,default:0},
    date: Date
})

module.exports = mongoose.model('Result', ResultSchema)
