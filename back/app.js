const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { router: userRouter } = require('./user');
const { router: authRouter } = require('./auth');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get("/", (_req, res) => res.send('Welcome'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use((_req, _res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use('/api', (err, _req, res, _next) => {
    // TODO
    res.json(500, { flash: String(err.message) });
});

const server = app.listen(process.env.PORT || 5000,
    () => console.log(`Listening on port ${server.address().port}`));
