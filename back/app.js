const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./user/router');
const authRouter = require('./auth/router');
const errors = require('./helpers/errors');
const { asyncMw } = require('./helpers/async-wrappers');

['local', 'jwt'].forEach(name => passport.use(require(`./auth/${name}/strategy`)));

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use(asyncMw(async ({ originalUrl }) => {
    throw errors.notFound(`the requested URL '${originalUrl}' was not found`);
}));

app.use((err, _req, res, _next) => {
    if (res.headersSent) {
        console.error('Headers already sent', err);
        res.end();
    } else {
        (!err.httpStatus || err.printLog) && console.error(err);
        const message = String((err.httpStatus && err.message) || 'server error');
        res.status(err.httpStatus || 500).json({ message });
    }
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${server.address().port}`);
});
