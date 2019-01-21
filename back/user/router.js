const express = require('express');
const dbPool = require('../db/pool');
const errors = require('../errors');
const jwtAuth = require('../auth/jwt/authenticator');
const { asyncMw, asyncFn } = require('../helpers/async-wrappers');

const asyncDbQuery = asyncFn((...args) => dbPool.query(...args));

const router = express.Router();

router.get('/:email/profile', jwtAuth, asyncMw(async ({ params }, res, next) => {
    const [[profile]] = await asyncDbQuery('SELECT name, lastname FROM users WHERE email=?', params.email);
    if (profile) {
        res.json(profile);
    } else {
        next(errors.notFound(`User '${params.email}' not found`));
    }
}));

module.exports = router;
