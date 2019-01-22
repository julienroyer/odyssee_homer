const passport = require('passport');

module.exports = exports = passport.authenticate('jwt', { session: false });
