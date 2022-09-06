const { deleteCommentQuery } = require('../../database/queries');

const deleteComment = (req, res, next) => {
  const { comId } = req.params;

  deleteCommentQuery({ comId })
    .then((data) => res.status(200).json({ message: 'comment deleted' }))
    .catch((err) => next(err));
};

module.exports = deleteComment;
