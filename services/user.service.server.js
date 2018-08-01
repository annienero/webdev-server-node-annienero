module.exports = function (app) {
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/profile', getCurrentUser);
    app.post('/api/user', register);
    app.get('/api/user', function(req, res) {
        userModel.findAllUsers()
            .then(response => res.send(response))
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
                return userModel.createUser(newUser)
                    .then(function (user) {
                        req.session['currentUser'] = user
                        res.send(user)
                    })
            } else {
                res.send(); //TODO how to send bad
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
                res.send(0); //TODO how to send bad
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