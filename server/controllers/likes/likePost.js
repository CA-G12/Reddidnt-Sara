const { likePostQuery, unlikePostQuery, checkLikeQuery } = require('../../database/queries');

const likePost = (req, res, next) => {
  const { id } = req.data;
  const { postId } = req.params;

  checkLikeQuery({ id: +id + +postId })
    .then((data) => {
      if (data.rowCount) return unlikePostQuery({ id: +id + +postId });
      return likePostQuery({ id: +id + +postId, postId, userId: id });
    })
    .then((result) => {
      if (result.command === 'INSERT') return res.status(200).json({ message: 'post liked' });
      return res.status(200).json({ message: 'post unliked' });
    })
    .catch((err) => next(err));
};

module.exports = likePost;
