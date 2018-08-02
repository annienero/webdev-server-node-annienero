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

function findSectionById(sectionId){
    return sectionModel.findOne({_id: sectionId})
}

function updateSection(sectionId, newSection) {
    return sectionModel.update({_id: sectionId},
        {$set: newSection}, {upsert: true})
}

module.exports = {
    createSection: createSection,
    findAllSectionsForCourse: findAllSectionsForCourse,
    deleteSection: deleteSection,
    findSectionById: findSectionById,
    updateSection: updateSection
}