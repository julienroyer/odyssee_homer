const connection = require('../helpers/db');
const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
    connection.query('INSERT INTO users SET ?', req.body, error => {
        if (error) {
            res.status(500).send(error).end();
        } else {
            res.end();
        }
    });
});

module.exports = router;
