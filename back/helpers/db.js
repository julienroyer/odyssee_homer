const mysql = require('mysql');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'julien',
    password: 'marcelmarcel',
    database: 'odyssee_homer'
});
