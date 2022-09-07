const bcrypt = require('bcrypt');

const { signInQuery } = require('../../database/queries');
const { signInValidation } = require('../../validation');
const { generateToken } = require('../../utils/authToken');
const GenerateError = require('../../utils/GenerateError');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  let payload = {};

  signInValidation.validateAsync(req.body)
    .then((result) => result)
    .catch((err) => {
      throw new GenerateError(400, err.details[0].message);
    })
    .then((result) => signInQuery({ email }))
    .then((data) => {
      if (!data.rows.length) throw new GenerateError(400, 'Please check your email/password');
      else {
        payload.id = data.rows[0].id;
        payload.name = data.rows[0].name;
        payload.user_img = data.rows[0].user_img;
        return bcrypt.compare(password, data.rows[0].password);
      }
    })
    .then((result) => {
      if (!result) throw new GenerateError(400, 'Please check your email/password');
      else return generateToken(payload);
    })
    .then((token) => {
      res.cookie('token', token, { httpOnly: true })
        .status(200)
        .json({ message: 'welcome back' });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = signIn;
