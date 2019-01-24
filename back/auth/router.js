'use strict';

const { asyncMw, awaitable } = require('../helpers/async-wrappers');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = awaitable(require('jsonwebtoken'));
const dbPool = require('../helpers/db/pool');
const errors = require('../helpers/errors');
const jwtSecretOrKey = require('./passport/jwt/secret-or-key');
const localAuth = require('./passport/local/authenticator');

module.exports = () => express.Router()
    .post('/signup', asyncMw(async (req, res) => {
        const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
            const val = req.body[v];
            if (!(a[v] = (val && String(val).trim()))) {
                throw errors.badRequest(`'${v}' value is empty.`);
            }
            return a;
        }, {});
        values.password = await bcrypt.hash(values.password, 10);
        try {
            await dbPool.awaitableQuery('INSERT INTO users SET ?', values);
        } catch (e) {
            throw e.code === 'ER_DUP_ENTRY' ?
                errors.conflict(`The user '${values.email}' already exists.`, { causedBy: e }) :
                e;
        }
        res.json({ message: 'You have signed up!' });
    }))
    .post('/signin', localAuth, asyncMw(async (_req, res) => {
        const token = await jwt.awaitableSign(res.locals.user, jwtSecretOrKey, { expiresIn: '1h' });
        res.json({ ...res.locals.user, token });
    }));
