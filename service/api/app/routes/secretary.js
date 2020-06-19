const passport = require('passport');
const models = require('@Manager/app/setup');
const config = require('@config');

module.exports = (app) => {
    const api = app.api.app.api.secretary;

    app.route('/api/v1/secretary')
        .get((req, res) => res.send(`PotatoAPI (*~*)`));

    app.route('/api/v1/secretary/list')
        .get(
            passport.authenticate('jwt', config.session),
            api.list(models.User, app.get(config.secret))
        );

    [
        'add',
        'update',
        'remove'
    ].forEach(method => {
        app.route(`/api/v1/secretary/${method}`)
            .post(
                passport.authenticate('jwt', config.session),
                api[method](models.User, app.get(config.secret))
            );
    });
};