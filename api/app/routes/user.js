const models = require('@Potato/app/setup');

module.exports = (app) => {
    const api = app.potato_api.app.api.user;

    app.route('/api/v1/signup')
        .post(api.signup(models.User));
};