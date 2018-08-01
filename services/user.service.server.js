module.exports = function (app) {
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.get('/api/profile', getCurrentUser);
    app.get('/api/user', function(req, res) {
        userModel.findAllUsers()
            .then(response => res.send(response))
    })
    app.post('/api/user', function(req, res) {
        var user = req.body
        userModel.createUser(user)
            .then(function (user) {
                res.send(user)
            })
    })
}

var userModel = require('../models/user/user.model.server');

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
                return userModel
                    .createUser(newUser)
            }
        })
        .then(function (user) {
            req.session['currentUser'] = user;
            res.send(user);
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
                res.send(0);
            }
        });

}

function logout(req, res) {
    req.session.destroy();
    res.send(200);
}

function getCurrentUser(req, res) {
    var user = req.params['user']
    var value = req.session[user]
    res.send(value)
}