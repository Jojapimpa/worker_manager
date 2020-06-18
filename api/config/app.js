const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./passport')(passport);

app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.set('somesecret', config.secret);

module.exports = app;