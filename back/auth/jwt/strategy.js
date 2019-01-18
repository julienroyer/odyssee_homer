const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const secretOrKey = require('./secret-or-key');

module.exports = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey,
    },
    (jwtPayload, cb) => cb(null, jwtPayload)
);
