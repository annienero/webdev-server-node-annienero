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


function decrementSeats(sectionId) {
    return sectionModel.update({
        _id:sectionId
    }, {
        $inc: {seats: -1}
    })
}

function incrementSeats(sectionId) {
    return sectionModel.update({
        _id:sectionId
    }, {
        $inc: {seats: +1}
    })
}


module.exports = {
    createSection: createSection,
    findAllSectionsForCourse: findAllSectionsForCourse,
    deleteSection: deleteSection,
    findSectionById: findSectionById,
    updateSection: updateSection,
    decrementSeats: decrementSeats,
    incrementSeats: incrementSeats
}