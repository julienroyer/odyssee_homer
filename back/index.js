'use strict';

const express = require('express');
const morgan = require('morgan');
const configurePassport = require('./auth/passport/configure');
const configureRoutes = require('./routes/configure');

configurePassport();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

configureRoutes(app);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`\x1b[0;1mListening on port ${server.address().port}\x1b[m`);
});
