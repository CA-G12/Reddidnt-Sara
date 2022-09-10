const { updateDataQuery } = require('../../database/queries');

const updateData = (req, res, next) => {
  const { id } = req.data;
  const { name, user_img } = req.body;

  updateDataQuery({ name, user_img, id })
    .then((data) => res.status(200).json({ message: 'You updated your profile' }))
    .catch((err) => next(err));
};

module.exports = updateData;