// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const config = require('@config');

const api = {};

api.list = (Worker, token) => (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});

    Worker.find({}, (error, list) => {
        if (error) throw error;
        res.status(200).json(list);
    });
};

api.add = (Worker, token) => (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});


    let fields = [];
    let fields_req = [];

    Object.keys(Worker.schema.paths).forEach((key) => {
        if (key.match(/^_/))
            return;
        fields.push(key);

        if (!!Worker.schema.paths[key].isRequired && key !== 'passport')
            fields_req.push(key);
    });

    let data = {};
    fields.forEach(key => {
        if (req.body[key])
            data[key] = req.body[key]
    });

    let all_required = fields_req.every(key => !!data[key]);

    fields_req.forEach(key => console.log(key, !!data[key]));

    if (!all_required) {
        return res
            .status(400)
            .send({
                success: false,
                message: `Please, pass an all required fields: ${fields_req.join(', ')}`
            });
    }

    const worker = new Worker(data);

    worker.save(error => {
        if (error) {
            throw error;
        }
        res.json({success: true});
    })
};

api.update = (Worker, token) => async (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});


    let fields = [];

    Object.keys(Worker.schema.paths).forEach((key) => {
        if (key.match(/^_/))
            return;
        fields.push(key);

    });

    const worker = await Worker.findOne({_id: req.body['_id']});

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

api.remove = (Worker, token) => async (req, res) => {
    if (!token)
        return res.status(403).send({success: false, message: 'Unauthorized'});

    const worker = await Worker.findOne({_id: req.body['_id']});

    worker.remove(error => {
        res.json({success: true});
    });
};

module.exports = api;