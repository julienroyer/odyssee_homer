const passport = require('passport');

module.exports = () => {
    passport.use(require('./local/strategy'));
    passport.use(require('./jwt/strategy'));
};
