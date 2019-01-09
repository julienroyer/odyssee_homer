const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../helpers/db');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const values = ['email', 'password', 'name', 'lastname'].reduce((a, v) => {
        const val = req.body[v];
        a[v] = (val && String(val).trim()) || undefined;
        return a;
    }, {});
    values.password = await bcrypt.hash(values.password, 10);
    connection.query('INSERT INTO users SET ?', values, error => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else {
            res.json({ flash: 'User has been signed up!' }).end();
        }
    });
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT COUNT(*) AS count FROM users WHERE email=? AND password=?',
        [email, password], (error, result) => {
            if (error) {
                res.status(500).json({ flash: error.message }).end();
            } else if (result[0].count !== 1) {
                res.status(403).json({ flash: 'Invalid credentials' }).end();
            } else {
                res.json({ flash: 'User has been signed in!' }).end();
            }
        });
});

module.exports = router;
