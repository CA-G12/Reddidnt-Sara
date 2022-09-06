const connection = require('../../config/connection');

const deleteCommentQuery = ({ comId }) => connection
  .query('DELETE FROM comments WHERE id = ($1)', [comId]);

module.exports = deleteCommentQuery;
