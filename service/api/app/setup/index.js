const mongoose = require('mongoose');
require('@Models/user');
require('@Models/worker');

const models = {
    User: mongoose.model('User'),
    Worker: mongoose.model('Worker'),
};

module.exports = models;