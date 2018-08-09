const mongoose = require('mongoose')
var submissionSchema = require('./submission.schema.server')
var submissionModel = mongoose.model('SubmissionModel', submissionSchema)


function createSubmission(quiz, student) {
    let answers = []
    quiz.questions.forEach(question => {
        switch(question.questionType) {
            case 'ESSAY':
                answers.push({
                    question: question,
                    essayAnswer: question.essayAnswer
                })
                break
            case 'FILL_BLANKS':
                answers.push({
                    question: question,
                    fillBlanksAnswers: question.fillBlanksAnswers
                })
                break
            case 'TRUE_FALSE':
                answers.push({
                    question: question,
                    trueFalseAnswer: question.trueFalseAnswer
                })
                break
            case 'CHOICE':
                answers.push({
                    question: question,
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

function findSubmissionForStudentById(submissionId, studentId) {
    return submissionModel.findOne({_id: submissionId, student: studentId})
}

function findSubmissionsForStudent(studentId) {
    return submissionModel.findOne({student: studentId})
}

module.exports = {
    createSubmission: createSubmission,
    findSubmissionForStudentById: findSubmissionForStudentById,
    findSubmissionsForStudent: findSubmissionsForStudent
}