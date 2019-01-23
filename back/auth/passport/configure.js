'use strict';

module.exports = exports = () => {
    const passport = require('passport');
    passport.use(require('./local/strategy'));
    passport.use(require('./jwt/strategy'));
};
