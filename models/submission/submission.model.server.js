const mongoose = require('mongoose')
var submissionSchema = require('./submission.schema.server')
var submissionModel = mongoose.model('SubmissionModel', submissionSchema)


function createSubmission(quiz, student) {
    let answers = []
    quiz.questions.forEach(question => {
        switch(question.questionType) {
            case 'ESSAY':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    essayAnswer: question.essayAnswer
                })
                break
            case 'FILL_BLANKS':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    fillBlanksAnswers: question.fillBlanksAnswers
                })
                break
            case 'TRUE_FALSE':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    trueFalseAnswer: question.trueFalseAnswer
                })
                break
            case 'CHOICE':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    multipleChoiceAnswer: question.multipleChoiceAnswer
                })
                break
        }
    });
    let submission = {
        quiz: quiz,
        student: student,
        submissionTime: new Date(),
        answers: answers
    }
    return submissionModel.create(submission)
}

function findSubmissions(quizId, studentId) {
    return submissionModel.find({quiz: quizId, student: studentId})
}

function findSubmission(submissionId, studentId) {
    return submissionModel.findOne({_id: submissionId, student: studentId})
        .populate('quiz')
        .exec()
}

module.exports = {
    createSubmission: createSubmission,
    findSubmissions: findSubmissions,
    findSubmission: findSubmission
}