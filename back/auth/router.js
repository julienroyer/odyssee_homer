const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { asyncMiddleware, asyncMysqlPool } = require('../util/async-wrappers');
const dbPool = asyncMysqlPool(require('../db/pool'));
const errors = require('../errors');
const jwtSecretOrKey = require('./jwt/secret-or-key');
const localAuth = require('./local/authenticator');

const router = express.Router();

router.post('/signup', asyncMiddleware(async (req, res) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        if (!(a[v] = (val && String(val).trim()))) {
            throw errors.badRequest(`'${v}' value is empty`);
        }
        return a;
    }, {});
    values.password = await bcrypt.hash(values.password, 10);
    try {
        await dbPool.asyncQuery('INSERT INTO users SET ?', values);
    } catch (e) {
        throw e.code === 'ER_DUP_ENTRY' ?
            errors.conflict(`the user '${values.email}' already exists`, { causedBy: e }) :
            e;
    }
    res.json({ flash: 'you have signed up' });
}));

router.post('/signin', localAuth, ({ user }, res) => {
    // TODO async
    const token = jwt.sign(user, jwtSecretOrKey, { expiresIn: '1h' });
    res.json({ user, token });
});

module.exports = router;
