const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { router: userRouter } = require('./user');
const { router: authRouter } = require('./auth');
const exceptions = require('./exceptions');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use((req, _res, next) =>
    next(exceptions.notFound(`the requested URL '${req.originalUrl}' was not found`)));

app.use('/api', (err, _req, res, _next) => {
    console.error('API exception', err);

    if (!res.headersSent) {
        const message = String((err.httpStatus && err.message) || 'API exception');
        res.status(err.httpStatus || 500).json({ flash: message });
    }
});

app.use((err, _req, res, _next) => {
    console.error('Exception', err);

    if (!res.headersSent) {
        const message = String((err.httpStatus && err.message) || '');
        res.status(err.httpStatus || 500).send(`Exception${message ? ': ' + message : ''}`);
    }
});

const server = app.listen(process.env.PORT || 5000,
    () => console.log(`Listening on port ${server.address().port}`));
