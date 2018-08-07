module.exports = function (app) {
    app.get('/api/question', findAllQuestions);
    app.get('/api/question/:questionId', findQuestionById);
}

var questionModel = require('../models/question/question.model.server');

function findAllQuestions(req, res) {
    questionModel.findAllQuestions()
        .then(function(questions) { res.json(questions) })
}

function findQuestionById(req, res) {
    questionModel.findQuestionById(req.params['questionId'])
        .then(function(question) { res.json(question) })
}