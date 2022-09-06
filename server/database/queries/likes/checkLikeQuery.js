const connection = require('../../config/connection');

const checkLikeQuery = ({ id }) => connection
  .query('SELECT * FROM likes WHERE id = ($1)', [id]);

module.exports = checkLikeQuery;
