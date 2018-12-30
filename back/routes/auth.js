const connection = require('../helpers/db');
const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
    connection.query('INSERT INTO users SET ?', req.body, error => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else {
            res.json({ flash: 'User has been signed up!' }).end();
        }
    });
});

router.post('/signin', (req, res) => {
    const b = req.body;
    connection.query('SELECT COUNT(*) AS count FROM users WHERE email=? AND password=?',
        [b.email, b.password], (error, result) => {
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
