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

module.exports = router;
