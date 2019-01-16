const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbPool = require('../db/pool');
const { safeAsync } = require('../helpers/middlewares');
const exceptions = require('../exceptions');

const router = express.Router();

router.post('/signup', safeAsync(async (req, res, next) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        if (!(a[v] = (val && String(val).trim()))) {
            throw exceptions.badRequest(`missing '${v}' parameter`);
        }
        return a;
    }, {});
    values.password = await bcrypt.hash(values.password, 10);
    dbPool.query('INSERT INTO users SET ?', values, error => {
        if (error) {
            next(error);
        } else {
            res.json({ flash: 'User has been signed up!' }).end();
        }
    });
}));

router.post('/signin', (req, res, next) => passport.authenticate('local', (error, user, info) => {
    if (error) {
        next(error);
    } else if (user) {
        const token = jwt.sign(user, 'your_jwt_secret');
        res.json({ flash: info, user, token, }).end();
    } else {
        next(exceptions.unauthorized(info));
    }
})(req, res));

module.exports = router;
