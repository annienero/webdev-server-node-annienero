const mongoose = require('mongoose')

var questionSchema = mongoose.Schema({
    title: String,
    points: Number,
    description: String,
    choices: [{
        text: String,
        value: String,
        correct: Boolean
    }],
    questionType: {
        type: String,
        enum: ['ESSAY', 'FILL_BLANKS', 'TRUE_FALSE', 'CHOICE']
    }
}, {collection: 'question'})

module.exports = questionSchema;