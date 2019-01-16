const express = require('express');
const passport = require('passport');
const dbPool = require('../db/pool');
const exceptions = require('../exceptions');

const router = express.Router();

router.get('/:email/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const email = req.params.email;
    dbPool.query('SELECT name, lastname FROM users WHERE email=?', [email], (error, result) => {
        if (error) {
            next(error);
        } else if (!result.length) {
            next(exceptions.notFound(`User '${email}' not found`));
        } else {
            res.json(result[0]);
        }
    });
});

module.exports = router;
