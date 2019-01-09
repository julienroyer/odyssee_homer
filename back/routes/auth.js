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
    values.password = values.password && await bcrypt.hash(values.password, 10);
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
    connection.query('SELECT password FROM users WHERE email=?', [email], async (error, result) => {
        if (error) {
            res.status(500).json({ flash: error.message }).end();
        } else {
            const entry = result[0];
            const match = await bcrypt.compare(password, entry ? entry.password : '$2b$10$TRUiCb7DnUDKN0544viAZ.cZNey36JuR3vxm7MjECG7yY9NR6HVeS');
            if (entry && match) {
                res.json({ flash: 'User has been signed in!' }).end();
            } else {
                res.status(403).json({ flash: 'Invalid credentials' }).end();
            }
        }
    });
});

module.exports = router;
