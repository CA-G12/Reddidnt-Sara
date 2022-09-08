const connection = require('../../config/connection');

const getCommentsQuery = ({ id }) => connection
  .query('select users.name, users.user_img, comments.* from users join comments on users.id = comments.user_id where comments.post_id = ($1);', [id]);

module.exports = getCommentsQuery;
