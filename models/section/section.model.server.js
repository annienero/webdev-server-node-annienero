const mongoose = require('mongoose')
var sectionSchema = require('./section.schema.server')

var sectionModel = mongoose.model('SectionModel', sectionSchema)

function createSection(section) {
    return sectionModel.create(section)
}

module.exports = {
    createSection: createSection
}