const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const connection = require('../helpers/db');
const { safe } = require('../helpers/middlewares');

const router = express.Router();

router.post('/signup', safe(async (req, res) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        a[v] = (val && String(val).trim()) || undefined;
        return a;
    }, {});
    values.password = values.password && await bcrypt.hash(values.password, 10);
    connection.query('INSERT INTO users SET ?', values, error => {
        if (error) {
            res.status(500).json({ flash: error.message, }).end();
        } else {
            res.json({ flash: 'User has been signed up!' }).end();
        }
    });
}));

router.post('/signin', (req, res) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            res.status(500).json(error).end();
        } else if (user) {
            const token = jwt.sign(user, 'your_jwt_secret');
            res.json({ flash: info, user, token, }).end();
        } else {
            res.status(403).json({ flash: info, }).end();
        }
    })(req, res);
});

module.exports = router;
