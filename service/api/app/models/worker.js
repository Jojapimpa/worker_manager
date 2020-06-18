const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    fio: {
        type: String,
        required: true
    },
    passport: {
        type: {
            serial: {
                type: Number,
                required: true
            },
            registration: {
                type: String,
                required: true
            }
        },
        required: true
    },
    phone: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    status: {
        type: String,
        enum: ['active', 'reserved', 'dismissed'],
        default: 'active',
        required: true
    },
    workset:[]
});

mongoose.model('Worker', Schema);