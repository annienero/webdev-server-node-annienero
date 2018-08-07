const mongoose = require('mongoose')

var quizSchema = mongoose.Schema({
    title: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel'
    }]
}, {collection: 'quiz'})

module.exports = quizSchema;