const passport = require('passport');
const models = require('@Manager/app/setup');
const config = require('@config');

module.exports = (app) => {
    const api = app.potato_api.app.api.secretary;

    app.route('/api/v1/secretary')
        .get((req, res) => res.send(`Worker Manager API (._.)`));

    app.route('/api/v1/secretary/list')
        .get(
            passport.authenticate('jwt', config.session),
            api.list(models.User, app.get(config.secret))
        );

    app.route('/api/v1/secretary/add')
        .post(
            passport.authenticate('jwt', config.session),
            api.add(models.User, app.get(config.secret))
        );
};