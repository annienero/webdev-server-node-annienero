const mongoose = require('mongoose')

var questionSchema = mongoose.Schema({
    title: String,
    points: Number,
    description: String,
    questionType: {
        type: String,
        enum: ['ESSAY', 'FILL_BLANKS', 'TRUE_FALSE', 'CHOICE']
    }
}, {collection: 'question'})

module.exports = questionSchema;