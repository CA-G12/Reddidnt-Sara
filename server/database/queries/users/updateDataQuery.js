const connection = require('../../config/connection');

const updateDataQuery = ({ name, user_img, id }) => connection
  .query('update users set name = ($1), user_img = ($2)  where id = ($3);', [name, user_img, id]);

module.exports = updateDataQuery;
