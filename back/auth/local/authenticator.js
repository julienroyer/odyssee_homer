const passport = require('passport');
const errors = require('../../errors');

module.exports = (req, res, next) => {
    passport.authenticate('local', { session: false }, ((error, user, info) => {
        if (error) {
            next(error);
        } else if (user) {
            req.user = user;
            next();
        } else {
            next(errors.unauthorized(info));
        }
    }))(req, res, next);
};
