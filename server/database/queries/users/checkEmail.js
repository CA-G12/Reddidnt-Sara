const connection = require('../../config/connection');

const checkEmail = (email) => connection.query('SELECT email FROM users WHERE email= ($1)', email);

module.exports = checkEmail;
