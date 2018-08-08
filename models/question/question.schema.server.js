const mongoose = require('mongoose')

var questionSchema = mongoose.Schema({
    title: String,
    points: Number,
    description: String,
    choices: [{
        text: String,
        value: String
    }],
    blanks: [String],
    questionType: {
        type: String,
        enum: ['ESSAY', 'FILL_BLANKS', 'TRUE_FALSE', 'CHOICE']
    },
    essayAnswer: String,
    fillBlanksAnswers: {},
    trueFalseAnswer: Boolean,
    multipleChoiceAnswer: String
}, {collection: 'question'})

module.exports = questionSchema;