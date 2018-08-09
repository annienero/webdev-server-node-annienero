const mongoose = require('mongoose')

var quizSchema = mongoose.Schema({
    title: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel'
    }],
    updatedAt: Date
}, {collection: 'quiz'})

module.exports = quizSchema;