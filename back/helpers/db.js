const mysql = require('mysql');

module.exports = mysql.createPool({
    host: 'localhost',
    user: 'julien',
    password: 'marcelmarcel',
    database: 'odyssee_homer',
});
