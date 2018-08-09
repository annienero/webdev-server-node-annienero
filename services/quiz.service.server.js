module.exports = function (app) {
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/quiz/:quizId/submission', findSubmissions);
    app.get('/api/quiz/submission/:submissionId', findSubmission)
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

function findSubmissions(req, res) {
    submissionModel.findSubmissions(req.params['quizId'], req.session['currentUser'])
    .then(function(submissions) { res.json(submissions) })
}

function findSubmission(req, res) {
    submissionModel.findSubmission(req.params['submissionId'], req.session['currentUser'])
    .then(function(submission) { res.json(submission) })
}

