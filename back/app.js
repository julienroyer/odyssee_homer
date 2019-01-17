const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./user/router');
const authRouter = require('./auth/router');
const exceptions = require('./exceptions');

[require('./auth/local-strategy'), require('./auth/jwt-strategy')].forEach(
    s => passport.use(s));

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use((req, _res, next) => {
    next(exceptions.notFound(`the requested URL '${req.originalUrl}' was not found`));
});

app.use((err, _req, res, _next) => {
    const defaultMsg = 'server error';
    console.error(defaultMsg, err);

    if (!res.headersSent) {
        const message = String((err.httpStatus && err.message) || defaultMsg);
        res.status(err.httpStatus || 500).json({ flash: message });
    }
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${server.address().port}`);
});
