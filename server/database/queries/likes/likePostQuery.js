const connection = require('../../config/connection');

const likePostQuery = ({ id, postId, userId }) => connection
  .query('INSERT INTO likes(id, post_id, user_id) VALUES($1, $2, $3)', [id, postId, userId]);

module.exports = likePostQuery;
