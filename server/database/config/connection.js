require('dotenv').config();
const { Pool } = require('pg');

const {
  TEST_DB_URL, DEV_DEV_URL, DATABASE_URL, NODE_ENV,
} = process.env;

let url;

if (NODE_ENV === 'production') url = DATABASE_URL;
else if (NODE_ENV === 'development') url = DEV_DEV_URL;
else if (NODE_ENV === 'test') url = TEST_DB_URL;
else throw Error('No DB URL');

const connection = new Pool({
  connectionString: url,
  ssl: NODE_ENV !== 'production' ? false : { rejectUnauthorized: false },
});

module.exports = connection;
