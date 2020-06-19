const models = require('@Manager/app/setup');

module.exports = (app) => {
    const api = app.api.app.api.user;

    app.route('/api/v1/signup')
        .post(api.signup(models.User));
};