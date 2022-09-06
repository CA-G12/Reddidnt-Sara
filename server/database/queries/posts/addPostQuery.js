const connection = require('../../config/connection');

const addPostQuery = ({ post, img, id }) => connection
  .query('INSERT INTO posts(post, post_img, user_id) VALUES($1, $2, $3)', [post, img, id]);

module.exports = addPostQuery;
