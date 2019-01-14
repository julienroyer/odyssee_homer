const passport = require('passport');

const strategies = require('./passport-strategies');
const router = require('./router');

strategies.forEach(strategy => passport.use(strategy));

module.exports = { router };
