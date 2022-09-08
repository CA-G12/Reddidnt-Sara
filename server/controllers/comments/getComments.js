const { getOnePostQuery, getCommentsQuery } = require('../../database/queries');

const getComments = (req, res, next) => {
  const { postId } = req.params;
  const postComments = {}
  getOnePostQuery({ id: postId })
    .then((data) => {
      postComments.post = data.rows[0];
      return getCommentsQuery({ id: postId });
    })
    .then((data) => {
      postComments.comments = data.rows
      res.send(postComments);
    })
    .catch((err) => next(err));
};

module.exports = getComments;