const connection = require('../../config/connection');

const unlikePostQuery = ({ id }) => connection
  .query('DELETE FROM likes WHERE id=($1)', [id]);

module.exports = unlikePostQuery;
