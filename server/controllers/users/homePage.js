const { homePageQuery } = require('../../database/queries');

const homePage = (req, res, next) => {
  homePageQuery()
    .then((data) => res.status(200).json({ user: req.data || null, data: data.rows }))
    .catch((err) => next(err));
};

module.exports = homePage;
