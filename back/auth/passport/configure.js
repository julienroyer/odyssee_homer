'use strict';

const passport = require('passport');
const localStrategy = require('./local/strategy');
const jwtStrategy = require('./jwt/strategy');

module.exports = exports = () => [
    localStrategy,
    jwtStrategy,
].forEach(s => passport.use(s));
