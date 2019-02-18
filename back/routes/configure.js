'use strict';

const authRouter = require('../auth/router');
const userRouter = require('../user/router');
const errors = require('../helpers/errors');

module.exports = app => {
    app.use('/api/auth', authRouter());
    app.use('/api/user', userRouter());

    app.use(({ originalUrl }) => {
        throw errors.notFound(`The requested URL '${originalUrl}' was not found.`);
    });

    app.use((err, _req, res, next) => {
        if (res.headersSent) {
            next(err);
        } else {
            (!err.httpStatus || err.printLog) && console.error(err);
            const message = String((err.httpStatus && err.message) || 'Server error.');
            res.status(err.httpStatus || 500).json({ message });
        }
    });
};
