"use strict";

const express = require('express');
const dbPool = require('../helpers/db/pool');
const errors = require('../helpers/errors');
const jwtAuth = require('../auth/passport/jwt/authenticator');
const { asyncMw } = require('../helpers/async-wrappers');

const router = module.exports = exports = express.Router();

router.get('/:email/profile', jwtAuth, asyncMw(async ({ params }, res) => {
    const [profile] = await dbPool.awaitableQuery('SELECT name, lastname FROM users WHERE email=?', params.email);
    if (!profile) {
        throw errors.notFound(`User '${params.email}' not found.`);
    }
    res.json(profile);
}));
