module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findAllSectionsForCourse);
    app.delete('/api/section/:sectionId', deleteSection);
    app.get('/api/section/:sectionId', findSectionById);
    app.put('/api/section/:sectionId', updateSection);
}

var sectionModel = require('../models/section/section.model.server');

function createSection(req, res) {
    return sectionModel.createSection(req.body)
        .then(function (section) {
                res.json(section)
            },
            function (section) {
                res.send(500)
            })
}

function findAllSectionsForCourse(req, res) {
    sectionModel.findAllSectionsForCourse(req.params['courseId'])
        .then(function (sections) {res.json(sections)})
}

function deleteSection(req, res) {
    sectionModel.deleteSection(req.params['sectionId'])
        .then(function (sections) {res.json(sections)})
}

function updateSection(req, res) {
    sectionModel.updateSection(req.params['sectionId'], req.body)
        .then(function (section) {
                res.json(section)
            },
            function (section) {
                res.send(500)
            })
}

function findSectionById(req, res) {
    sectionModel.findSectionById(req.params['sectionId'])
        .then(function (section) {res.json(section)})
}
