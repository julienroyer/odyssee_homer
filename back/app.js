'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const configurePassport = require('./auth/passport/configure');
const routes = require('./routes');

configurePassport();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

const server = app.listen(process.env.PORT || 5000, s => {
    console.log(s);
    console.log(`Listening on port ${server.address().port}`);
});
