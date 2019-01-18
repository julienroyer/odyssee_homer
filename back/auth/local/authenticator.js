const passport = require('passport');
const errors = require('../../errors');

module.exports = (req, res, next) => {
    passport.authenticate('local', { session: false }, ((error, user) => {
        if (error) {
            next(error);
        } else if (user) {
            res.locals.user = user;
            next();
        } else {
            next(errors.unauthorized('invalid credentials'));
        }
    }))(req, res, next);
};
