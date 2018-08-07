const mongoose = require('mongoose')
var questionSchema = require('./question.schema.server')
var questionModel = mongoose.model('QuestionModel', questionSchema)


function findAllQuestions() {
    return questionModel.find()
}

function findQuestionById(questionId) {
    return questionModel.findOne({_id: questionId})
}

module.exports = {
    findAllQuestions: findAllQuestions,
    findQuestionById: findQuestionById
}