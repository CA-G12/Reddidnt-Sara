const { likePostQuery, unlikePostQuery, checkLikeQuery } = require('../../database/queries');

const likePost = (req, res, next) => {
  const { id } = req.data;
  const { postId } = req.params;
  likePostQuery({ id: +id + +postId, postId, userId: id })
    .then((response) => res.status(200).json({ message: 'like updated' }))
    .catch((err) => next(err));
};

module.exports = likePost;
