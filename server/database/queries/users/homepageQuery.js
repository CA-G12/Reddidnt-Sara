const connection = require('../../config/connection');

const homePageQuery = () => connection
  .query('SELECT users.name, users.user_img, posts.*, count(likes.*) AS likes FROM users JOIN posts ON users.id = posts.user_id LEFT JOIN likes ON posts.id = likes.post_id GROUP BY posts.id, users.id ORDER BY likes DESC;');

module.exports = homePageQuery;
