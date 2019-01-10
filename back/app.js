const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const connection = require('./helpers/db');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get("/", (_req, res) => {
    res.send("youhou");
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use((_req, _res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    (email, password, done) =>
        connection.query('SELECT password FROM users WHERE email=?', [email], async (error, result) => {
            if (error) {
                done(error);
            } else {
                const entry = result[0];
                const match = await bcrypt.compare(password, entry ? entry.password : '$2b$10$TRUiCb7DnUDKN0544viAZ.cZNey36JuR3vxm7MjECG7yY9NR6HVeS');
                if (entry && match) {
                    done(null, { email, }, 'User has been signed in!');
                } else {
                    done(null, false, 'Invalid credentials');
                }
            }
        })
));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${server.address().port}`);
});
