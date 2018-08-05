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


function findSectionsForStudent(studentId) {
    return enrollModel.find({studentId: studentId})
        .populate('sectionId')
        .exec()
}

function dropSection(enrollId) {
    return enrollModel.findByIdAndDelete(enrollId)
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    dropSection: dropSection
}