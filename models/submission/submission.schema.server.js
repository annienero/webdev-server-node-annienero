const mongoose = require('mongoose')

var submissionSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    answers: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        },
        fillBlanksAnswers: {variable: String, choiceValue: String},
        multipleChoiceAnswer: String,
        essayAnswer: String,
        trueFalseAnswer: Boolean
    }],
    submissionTime: {type: Date}
}, {collection: 'submission'})

module.exports = submissionSchema;