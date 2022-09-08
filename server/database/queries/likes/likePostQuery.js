const connection = require('../../config/connection');

const likePostQuery = ({ id, postId, userId }) => connection
  .query(`
    DO $$
    BEGIN
    IF (SELECT COUNT(*) FROM likes WHERE id = ${id}) > 0
    THEN DELETE FROM likes WHERE id = ${id};
    ELSE INSERT INTO likes(id, post_id, user_id) VALUES (${id}, ${postId}, ${userId});
    END IF;
    END $$;
  `);

module.exports = likePostQuery;

// NOT RECOMMENDED, but the only way that worked
