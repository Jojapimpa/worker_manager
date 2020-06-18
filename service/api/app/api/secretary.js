// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const config = require('@config');

const api = {};

api.list = (User, token) => (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});

    User.find({type: 'secretary'}, {password: 0}, (error, users) => {
        if (error) throw error;
        res.status(200).json(users);
    });
};

api.add = (User, token) => (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});


    let fields = [];
    let fields_req = [];

    Object.keys(User.schema.paths).forEach((key) => {
        if (key.match(/^_/))
            return;
        fields.push(key);

        if (!!User.schema.paths[key].isRequired)
            fields_req.push(key);
    });

    let data = {};
    fields.forEach(key => {
        if (req.body[key])
            data[key] = req.body[key]
    });

    data['type'] = 'secretary';

    let all_required = fields_req.every(key => !!data[key]);

    if (!all_required) {
        return res
            .status(400)
            .send({
                success: false,
                message: `Please, pass an all required fields: ${fields_req.join(', ')}`
            });
    }

    const secretary = new User(data);

    secretary.save(error => {
        if (error) {
            if(error.code !== 11000)
                throw error;

            return res.json({success: false, message: "Пользователь с таким логином уже сущетсвует"});
        }
        res.json({success: true});
    })
};

api.update = (User, token) => async (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});


    let fields = [];

    Object.keys(User.schema.paths).forEach((key) => {
        if (key.match(/^_/))
            return;
        fields.push(key);
    });

    const worker = await User.findOne({_id: req.body['_id']});

    fields.forEach(key => {
        if (req.body[key])
            worker[key] = req.body[key]
    });

    worker.save(error => {
        if (error) {
            throw error;
        }
        res.json({success: true});
    })
};

api.remove = (User, token) => async (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});

    const worker = await User.findOne({_id: req.body['_id']});

    worker.remove(error => {
        res.json({success: true});
    });
};

module.exports = api;