const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'manuelcasanova',
  host: 'localhost',
  database: 'casino',
  password: 'password',
  port: 5432
});


module.exports = 
  pool;