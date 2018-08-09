module.exports = function (app) {
    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/quiz/:quizId/submission', findSubmissions);
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmission);
}

var submissionModel = require('../models/submission/submission.model.server');

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

