const bcrypt = require('bcrypt');
const { signUpQuery, checkEmail } = require('../../database/queries');
const { signUpValidation } = require('../../validation');
const { generateToken } = require('../../utils/authToken');
const GenerateError = require('../../utils/GenerateError');

const signUp = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  signUpValidation.validateAsync(req.body)
    .then((result) => result)
    .catch((err) => {
      throw new GenerateError(400, err.details[0].message);
    })
    .then((result) => checkEmail([email]))
    .then((data) => {
      if (data.rows.length) throw new GenerateError(400, 'email already exists');
      else return bcrypt.hash(password, 10);
    })
    .then((hash) => signUpQuery({ name, email, hash }))
    .then((data) => {
      const { id } = data.rows[0];
      return generateToken({ id, name });
    })
    .then((token) => {
      res.cookie('token', token, { httpOnly: true })
        .status(200)
        .json({ message: 'Welcome to our website' });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = signUp;
