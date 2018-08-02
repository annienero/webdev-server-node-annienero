module.exports = function (app) {
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/profile', getCurrentUser);
    app.post('/api/profile', updateCurrentUser);
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
                        req.session['currentUser'] = user
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
                req.session['currentUser'] = user;
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
    res.send(req.session['currentUser'])
}

function updateCurrentUser(req, res) {
    let id = req.session['currentUser']._id
    userModel.updateUser(id, req.body)
    req.session['currentUser'] = userModel.findUserById(id)
    res.send(req.session['currentUser'])
}

function deleteCurrentUser(req, res) {
    res.send(req.session['currentUser'])
}