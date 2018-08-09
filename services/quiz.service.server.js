module.exports = function (app) {
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.post('/api/quiz/:quizId/submission', submitQuiz);
}

var quizModel = require('../models/quiz/quiz.model.server');
var submissionModel = require('../models/submission/submission.model.server');

function findAllQuizzes(req, res) {
    quizModel.findAllQuizzes()
        .then(function(quizzes) { res.json(quizzes) })
}

function findQuizById(req, res) {
    quizModel.findQuizById(req.params['quizId'])
        .then(function(quiz) { res.json(quiz) })
}

function submitQuiz(req, res) {
    submissionModel.createSubmission(req.body, req.session['currentUser'])
    .then(function(submission) { res.json(submission) })
}

