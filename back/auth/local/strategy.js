const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const dbPool = require('../../db/pool');

const asyncDbQuery = asyncFn((...args) => dbPool.query(...args));

// TODO properly handle async
module.exports = new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const entry = asyncDbQuery('SELECT password FROM users WHERE email=?', email)[0];
    const match = await bcrypt.compare(password,
        entry ? entry.password : '$2b$10$TRUiCb7DnUDKN0544viAZ.cZNey36JuR3vxm7MjECG7yY9NR6HVeS');
    done(null, entry && match ? { email } : null);
});
