const { verifyToken } = require('../utils/authToken');
const GenerateError = require('../utils/GenerateError');

const addAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    verifyToken(token)
      .then((decode) => {
        req.data = decode;
        next();
      })
      .catch((err) => {
        next();
      });
  } else {
    next();
  }
};

module.exports = addAuth;
