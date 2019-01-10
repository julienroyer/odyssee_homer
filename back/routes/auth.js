const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const connection = require('../helpers/db');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        a[v] = (val && String(val).trim()) || undefined;
        return a;
    }, {});
    values.password = values.password && await bcrypt.hash(values.password, 10);
    connection.query('INSERT INTO users SET ?', values, error => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else {
            res.json({ flash: 'User has been signed up!' }).end();
        }
    });
});

router.post('/signin', (req, res) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            res.status(500).json(error).end();
        } else if (user) {
            res.json({ flash: info, }).end();
        } else {
            res.status(403).json({ flash: info, }).end();
        }
    })(req, res);
});

module.exports = router;
