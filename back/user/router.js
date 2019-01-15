const express = require('express');
const passport = require('passport');
const dbPool = require('../db/pool');

const router = express.Router();

router.get('/:email/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    const email = req.params.email;
    dbPool.query('SELECT name, lastname FROM users WHERE email=?', [email], (error, result) => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else if (!result.length) {
            res.status(404).json({ flash: `User '${email}' not found` }).end();
        } else {
            res.json(result[0]).end();
        }
    });
});

module.exports = router;
