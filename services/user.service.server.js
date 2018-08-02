module.exports = function (app) {
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/profile', getCurrentUser);
    app.put('/api/profile', updateCurrentUser);
    app.delete('/api/profile', deleteCurrentUser);
    app.post('/api/user', register);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user', function(req, res) {
        userModel.findAllUsers()
            .then(response => res.send(response))
    })
}

var userModel = require('../models/user/user.model.server');

function findUserById(req, res) {
    var id = req.params['userId']
    userModel.findUserById(id)
        .then(function(user) {
            res.json(user)
    })
}

function register(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (!user) {
                var newUser = {
                    username: username,
                    password: password
                }
                return userModel.createUser(newUser)
                    .then(function (user) {
                        req.session['currentUser'] = user._id
                        res.send(user)
                    })
            } else {
                res.sendStatus(403);
            }
        })
}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (user) {
                req.session['currentUser'] = user._id;
                res.send(user);
            } else {
                res.sendStatus(403);
            }
        });
}

function logout(req, res) {
    req.session.destroy();
    res.send(200);
}

function getCurrentUser(req, res) {
    userModel.findUserById(req.session['currentUser'])
        .then(function (user) {
            res.send(user)
        })
}

function updateCurrentUser(req, res) {
    userModel.updateUser(req.session['currentUser'], req.body)
        .then(function (user) {
                res.send(200)
            },
            function (user) {
                res.send(500)
            })
}

function deleteCurrentUser(req, res) {
//TODO
}