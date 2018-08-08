const mongoose = require('mongoose')
var submissionSchema = require('./submission.schema.server')
var submissionModel = mongoose.model('SubmissionModel', submissionSchema)


function createSubmission(submission) {
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