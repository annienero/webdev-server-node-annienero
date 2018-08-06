const mongoose = require('mongoose')

var quizSchema = mongoose.Schema({
    title: String
}, {collection: 'quiz'})

module.exports = quizSchema;