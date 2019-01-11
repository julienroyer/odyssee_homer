const mysql = require('mysql');

module.exports = {
    pool: mysql.createPool({
        host: 'localhost',
        user: 'julien',
        password: 'marcelmarcel',
        database: 'odyssee_homer',
    })
}
