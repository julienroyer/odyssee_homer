const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const { router: authRouter } = require('./auth');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get("/", (_req, res) => res.send("Welcome"));

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use((_req, _res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const server = app.listen(process.env.PORT || 5000,
    () => console.log(`Listening on port ${server.address().port}`));
