const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) =>
    dbPool.query('SELECT password FROM users WHERE email=?', [email], (async (error, result) => {
        if (error) {
            throw error;
        }
        const entry = result[0];
        const match = await bcrypt.compare(password,
            entry ? entry.password : '$2b$10$TRUiCb7DnUDKN0544viAZ.cZNey36JuR3vxm7MjECG7yY9NR6HVeS');
        if (entry && match) {
            done(null, { email }, 'user has been signed in!');
        } else {
            done(null, null, 'invalid credentials');
        }
    }).catch(done))
));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
    (jwtPayload, cb) => cb(null, jwtPayload)
));
