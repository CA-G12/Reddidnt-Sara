const connection = require('../../config/connection');

const profilePageQuery = ({ id }) => connection
  .query('SELECT users.name, users.user_img, posts.*, count(likes.*) AS likes FROM users JOIN posts ON users.id = posts.user_id LEFT JOIN likes ON posts.id = likes.post_id WHERE users.id = ($1) GROUP BY posts.id, users.id ORDER BY likes DESC;', [id]);

module.exports = profilePageQuery;
