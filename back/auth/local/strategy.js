const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const dbPool = require('../../db/pool');
const { asyncMw } = require('../../helpers/async-wrappers');

module.exports = new LocalStrategy({ usernameField: 'email' }, asyncMw(async (email, password, done) => {
    const [[entry]] = await dbPool.asyncQuery('SELECT password FROM users WHERE email=?', email);
    const match = await bcrypt.compare(password,
        entry ? entry.password : '$2b$10$TRUiCb7DnUDKN0544viAZ.cZNey36JuR3vxm7MjECG7yY9NR6HVeS');
    done(null, entry && match && { email });
}));
