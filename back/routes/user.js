const connection = require('../helpers/db');
const express = require('express');

const router = express.Router();

router.get('/:email/profile', (req, res) => {
    const email = req.params.email;
    connection.query('SELECT * FROM users WHERE email=?', [email], (error, result) => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else if (!result.length) {
            res.status(404).json({ flash: `User '${email}' not found` }).end();
        } else {
            const { id, password, ...profile } = result[0];
            res.json(profile).end();
        }
    });
});

module.exports = router;
