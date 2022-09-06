const { addCommentQuery } = require('../../database/queries');

const addComment = (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.data;
  const { comment } = req.body;

  addCommentQuery({ comment, postId, userId: id })
    .then((data) => res.status(200).json({ message: 'comment added' }))
    .catch((err) => {
      next(err);
    });
};

module.exports = addComment;
