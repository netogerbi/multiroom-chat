const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './app/views')

module.exports = app
