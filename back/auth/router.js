const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { pool: dbPool } = require('../helpers/db');
const { safeAsync } = require('../helpers/middlewares');

const router = express.Router();

router.post('/signup', safeAsync(async (req, res) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        if (!(a[v] = (val && String(val).trim()))) {
            throw `missing '${v}' parameter`;
        }
        return a;
    }, {});
    values.password = await bcrypt.hash(values.password, 10);
    dbPool.query('INSERT INTO users SET ?', values, error => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else {
            res.json({ flash: 'User has been signed up!' }).end();
        }
    });
}));

router.post('/signin', (req, res) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else if (user) {
            const token = jwt.sign(user, 'your_jwt_secret');
            res.json({ flash: info, user, token, }).end();
        } else {
            res.status(403).json({ flash: info, }).end();
        }
    })(req, res);
});

module.exports = router;
