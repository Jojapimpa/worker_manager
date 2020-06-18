const models = require('@Potato/app/setup');

module.exports = (app) => {
    const api = app.potato_api.app.api.auth;

    app.route('/')
        .get((req, res) => res.send(`Worker Manager API (*~*)`));

    app.route('/api/v1/auth')
        .post(api.login(models.User));
};