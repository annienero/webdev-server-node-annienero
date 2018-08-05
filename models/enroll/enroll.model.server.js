const mongoose = require('mongoose')
var enrollSchema = require('./enroll.schema.server')

var enrollModel = mongoose.model('EnrollModel', enrollSchema)

function enrollStudentInSection(sectionId, userId) {
    var enrollment = {
        studentId: userId,
        sectionId: sectionId
    }
    return enrollModel.create(enrollment)
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection
}