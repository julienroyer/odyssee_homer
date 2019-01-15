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
    if (!res.headersSent) {
        console.error('API exception', err);
        res.status(err.httpStatus || 500).json({ flash: String(err.message) });
    }
});

const server = app.listen(process.env.PORT || 5000,
    () => console.log(`Listening on port ${server.address().port}`));
