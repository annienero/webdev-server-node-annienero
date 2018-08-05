var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/webdev')
app.use(session({
    maxAge: Date.now() + (30 * 1800000),
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200") //TODO local
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

var userService = require('./services/user.service.server')
userService(app)
var sectionService = require('./services/section.service.server')
sectionService(app)
app.listen(3000)
