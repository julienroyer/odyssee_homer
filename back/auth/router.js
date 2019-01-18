const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { asyncMw, asyncFn } = require('../util/async-wrappers');
const dbPool = require('../db/pool');
const errors = require('../errors');
const jwtSecretOrKey = require('./jwt/secret-or-key');
const localAuth = require('./local/authenticator');

const router = express.Router();

const asyncJwtSign = asyncFn(jwt.sign);
const asyncDbQuery = asyncFn((...args) => dbPool.query(...args));

router.post('/signup', asyncMw(async (req, res) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        if (!(a[v] = (val && String(val).trim()))) {
            throw errors.badRequest(`'${v}' value is empty`);
        }
        return a;
    }, {});
    values.password = await bcrypt.hash(values.password, 10);
    try {
        await asyncDbQuery('INSERT INTO users SET ?', values);
    } catch (e) {
        throw e.code === 'ER_DUP_ENTRY' ?
            errors.conflict(`the user '${values.email}' already exists`, { causedBy: e }) :
            e;
    }
    res.json({ flash: 'you have signed up' });
}));

router.post('/signin', localAuth, asyncMw(async (_req, res) => {
    const token = await asyncJwtSign(res.locals.user, jwtSecretOrKey, { expiresIn: '1h' });
    res.json({ user: res.locals.user, token });
}));

module.exports = router;
