const mongoose = require('mongoose')
var quizSchema = require('./quiz.schema.server')
var quizModel = mongoose.model('QuizModel', quizSchema)


function findAllQuizzes() {
    return quizModel.find()
}

function findQuizById(quizId) {
    return quizModel.findOne({_id: quizId})
}

module.exports = {
    findAllQuizzes: findAllQuizzes,
    findQuizById: findQuizById
}