const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./passport')(passport);
const config = require('./index.js');
const database = require('./database')(mongoose, config);

app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.set('somesecret', config.secret);

module.exports = app;