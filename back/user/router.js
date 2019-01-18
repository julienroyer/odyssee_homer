const express = require('express');
const dbPool = require('../db/pool');
const errors = require('../errors');
const jwtAuth = require('../auth/jwt/authenticator');

const router = express.Router();

router.get('/:email/profile', jwtAuth, (req, res, next) => {
    const email = req.params.email;
    dbPool.query('SELECT name, lastname FROM users WHERE email=?', [email], (error, result) => {
        if (error) {
            next(error);
        } else if (!result.length) {
            next(errors.notFound(`User '${email}' not found`));
        } else {
            res.json(result[0]);
        }
    });
});

module.exports = router;
