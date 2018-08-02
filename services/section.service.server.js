module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection)
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
