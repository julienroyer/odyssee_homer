const express = require('express');

export default router = express.Router();

router.post('/signup', (_req, res) => {
    res.send('I am in POST signup');
});
