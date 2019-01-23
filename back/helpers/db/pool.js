const mysql = require('mysql');
const { awaitable } = require('../async-wrappers');

module.exports = exports = awaitable(mysql.createPool({
    host: 'localhost',
    user: 'julien',
    password: 'marcelmarcel',
    database: 'odyssee_homer',
}));
