const { profilePageQuery } = require('../../database/queries');

const profilePage = (req, res, next) => {
  const { id } = req.data;
  profilePageQuery({ id })
    .then((data) => res.status(200).json({ user: req.data, data: data.rows }))
    .catch((err) => next(err));
};

module.exports = profilePage;
