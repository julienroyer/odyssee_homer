const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

// TODO use real secret or key
module.exports = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret',
    },
    (jwtPayload, cb) => cb(null, jwtPayload),
);
