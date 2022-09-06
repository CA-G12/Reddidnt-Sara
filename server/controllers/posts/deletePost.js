const { deletePostQuery } = require('../../database/queries');

const deletePost = (req, res, next) => {
  const { postId } = req.params;
  deletePostQuery({ postId })
    .then((data) => res.status(200).json({ message: 'Post deleted' }))
    .catch((err) => next(err));
};

module.exports = deletePost;
