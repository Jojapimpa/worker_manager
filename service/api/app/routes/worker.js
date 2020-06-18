const passport = require('passport');
const models = require('@Potato/app/setup');
const config = require('@config');

module.exports = (app) => {
    const api = app.potato_api.app.api.worker;

    app.route('/api/v1/worker')
        .get((req, res) => res.send(`PotatoAPI (*~*)`));

    [
        'list'
    ].forEach(method => {
        app.route(`/api/v1/worker/${method}`)
            .get(
                passport.authenticate('jwt', config.session),
                api[method](models.Worker, app.get(config.secret))
            );
    });

    [
        'add',
        'update',
        'remove'
    ].forEach(method => {
        app.route(`/api/v1/worker/${method}`)
            .post(
                passport.authenticate('jwt', config.session),
                api[method](models.Worker, app.get(config.secret))
            );
    });
};