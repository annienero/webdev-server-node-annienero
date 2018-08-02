const mongoose = require('mongoose')
var sectionSchema = require('./section.schema.server')

var sectionModel = mongoose.model('SectionModel', sectionSchema)

function createSection(section) {
    return sectionModel.create(section)
}

function findAllSectionsForCourse(courseId){
    return sectionModel.find({courseId: courseId})
}

module.exports = {
    createSection: createSection,
    findAllSectionsForCourse: findAllSectionsForCourse
}