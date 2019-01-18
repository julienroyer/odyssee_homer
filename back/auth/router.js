const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbPool = require('../db/pool');
const { asyncMiddleware } = require('../helpers/async-wrappers');
const errors = require('../errors');
const jwtSecretOrKey = require('./jwt/secret-or-key');

const router = express.Router();

router.post('/signup', asyncMiddleware(async (req, res, next) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        if (!(a[v] = (val && String(val).trim()))) {
            throw errors.badRequest(`missing '${v}' parameter`);
        }
        return a;
    }, {});
    values.password = await bcrypt.hash(values.password, 10);
    dbPool.query('INSERT INTO users SET ?', values, error => {
        if (error) {
            next(error.code === 'ER_DUP_ENTRY' ?
                errors.conflict(`this user already exists`, { causedBy: error }) : error);
        } else {
            res.json({ flash: 'you have signed up' });
        }
    });
}));

router.post('/signin', (req, res, next) => passport.authenticate('local', (error, user, info) => {
    if (error) {
        next(error);
    } else if (user) {
        const token = jwt.sign(user, jwtSecretOrKey);
        res.json({ flash: info, user, token, }).end();
    } else {
        next(errors.unauthorized(info));
    }
})(req, res));

module.exports = router;
