const mysql = require('mysql');
const { asyncProxy } = require('../helpers/async-wrappers');

module.exports = asyncProxy(mysql.createPool({
    host: 'localhost',
    user: 'julien',
    password: 'marcelmarcel',
    database: 'odyssee_homer',
}));
