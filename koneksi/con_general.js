const knex  = require('knex');

let db = knex({
    client: 'mssql',
    connection: {
        host: '192.168.0.7',
        user: 'wh01',
        password: 'W4r3house',
        database: 'MUGEN'
    }
});
module.exports = db;