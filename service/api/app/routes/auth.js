const models = require('@Manager/app/setup');

module.exports = (app) => {
    const api = app.api.app.api.auth;

    app.route('/')
        .get((req, res) => res.send(`Worker Manager API (*~*)`));

    app.route('/api/v1/auth')
        .post(api.login(models.User));
};