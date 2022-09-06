const connection = require('../../config/connection');

const deletePostQuery = ({ postId }) => connection
  .query('DELETE FROM posts WHERE id = ($1)', [postId]);

module.exports = deletePostQuery;
