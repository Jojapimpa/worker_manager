const mongoose = require('mongoose');
require('@Models/user');
require('@Models/worker');

const config = require('@config');

const models = {
    User: mongoose.model('User'),
    Worker: mongoose.model('Worker'),
};

let admin = new models.User({
    username: 'admin',
    password: config.default_admin_pass,
    type: 'admin',
    fio: "Администратор",
    email: 'admin@admin'
})

admin.save().catch(err => {});

module.exports = models;