const express = require('express');

const router = express.Router();

router.post('/signup', (_req, res) => {
    res.send('I am in POST signup');
});
