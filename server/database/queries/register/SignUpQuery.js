const connection = require('../../config/connection');

const signUpQuery = ({ name, email, hash }) => connection
  .query('INSERT INTO USERS(name,email,password) VALUES ($1,$2,$3) RETURNING *', [name, email, hash]);

module.exports = signUpQuery;
