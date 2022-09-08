const connection = require('../../config/connection');

const homePageQuery = () => connection
  .query(`
    SELECT users.name, users.user_img, users.date AS join_date, posts.*, 
    COUNT(likes.*) AS likes, COUNT(comments.*) AS comments
    FROM users JOIN posts ON users.id = posts.user_id 
    LEFT JOIN likes ON posts.id = likes.post_id
    LEFT JOIN comments ON posts.id = comments.post_id 
    GROUP BY posts.id, users.id 
    ORDER BY likes DESC;
  `);

module.exports = homePageQuery;
