var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/webdev')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
var userService = require('./services/user.service.server')
userService(app)
app.listen(3000)
