module.exports = function (app) {
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
}

var quizModel = require('../models/quiz/quiz.model.server');

function findAllQuizzes(req, res) {
    quizModel.findAllQuizzes()
        .then(function(quizzes) { res.json(quizzes) })
}

function findQuizById(req, res) {
    quizModel.findQuizById(req.params['quizId'])
        .then(function(quiz) { res.json(quiz) })
}
