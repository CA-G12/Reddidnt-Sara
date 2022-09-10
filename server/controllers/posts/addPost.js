const { addPostQuery } = require('../../database/queries');

const addPost = (req, res, next) => {
  const { id } = req.data;
  const { title, post, img } = req.body;

  addPostQuery({ title, post, img, id })
    .then(() => {
      res.status(200).json({ message: 'Post added successfully' });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = addPost;
