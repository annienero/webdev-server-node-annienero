module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findAllSectionsForCourse);
    app.delete('/api/section/:sectionId', deleteSection);
    app.get('/api/section/:sectionId', findSectionById);
    app.put('/api/section/:sectionId', updateSection);
    app.post('/api/section/:sectionId', enrollStudentInSection);
}

var sectionModel = require('../models/section/section.model.server');
var enrollModel = require('../models/enroll/enroll.model.server');

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


function enrollStudentInSection(req, res) {
    sectionModel.canEnroll(req.params['sectionId'])
        .then(function (canEnroll) {
            if (canEnroll) {
                sectionModel.decrementSeats(req.params['sectionId'])
                    .then(function () {
                        enrollModel.enrollStudentInSection(req.params['sectionId'], req.session['currentUser'])
                            .then(function (enrollment) {
                                    res.json(enrollment)
                                },
                                function (section) {
                                    res.send(500)
                                })
                    })
            } else {
                res.send(500)
            }
        })

}
