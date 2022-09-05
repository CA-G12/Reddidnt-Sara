const connection = require('../../config/connection');

const signInQuery = ({ email }) => connection
  .query('SELECT * FROM users WHERE email= ($1)', [email]);

module.exports = signInQuery;
