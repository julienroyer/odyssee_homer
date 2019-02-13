'use strict';

const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const dbPool = require('../../../helpers/db/pool');
const { asyncMw } = require('../../../helpers/async-wrappers');

module.exports =
    new LocalStrategy({ usernameField: 'email', session: false }, asyncMw(async (email, password, done) => {
        email = email.trim();
        password = password.trim();
        const [entry] = await dbPool.awaitableQuery('SELECT password FROM users WHERE email=?', email);
        const match = await bcrypt.compare(password,
            entry ? entry.password : '$2b$10$TRUiCb7DnUDKN0544viAZ.cZNey36JuR3vxm7MjECG7yY9NR6HVeS');
        done(null, entry && match && { email });
    }));
