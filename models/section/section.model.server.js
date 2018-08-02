const mongoose = require('mongoose')
var sectionSchema = require('./section.schema.server')

var sectionModel = mongoose.model('SectionModel', sectionSchema)

function createSection(section) {
    return sectionModel.create(section)
}

function findAllSectionsForCourse(courseId){
    return sectionModel.find({courseId: courseId})
}

function deleteSection(sectionId){
    return sectionModel.findByIdAndDelete(sectionId)
}

module.exports = {
    createSection: createSection,
    findAllSectionsForCourse: findAllSectionsForCourse,
    deleteSection: deleteSection
}