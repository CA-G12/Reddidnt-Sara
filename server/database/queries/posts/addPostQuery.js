const connection = require('../../config/connection');

const addPostQuery = (values) => connection.query('INSERT INTO USERS(name,email,password) VALUES ($1,$2,$3)', values);

module.exports = addPostQuery;
