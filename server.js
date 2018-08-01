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
app.listen(3000)
