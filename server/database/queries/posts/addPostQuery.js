const connection = require('../../config/connection');

const addPostQuery = ({
  title, post, img, id,
}) => connection
  .query('INSERT INTO posts(title, post, post_img, user_id) VALUES($1, $2, $3, $4)', [title, post, img, id]);

module.exports = addPostQuery;
