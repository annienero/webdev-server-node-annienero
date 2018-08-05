const mongoose = require('mongoose')

var enrollSchema = mongoose.Schema({
    sectionId: {type: mongoose.Schema.Types.ObjectId, ref: 'SectionModel'},
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    grade: String
}, {collection: 'enroll'})

module.exports = enrollSchema;