const { verifyToken } = require('../utils/authToken');
const GenerateError = require('../utils/GenerateError');

const authenticate = (req, res, next) => {
  const { token } = req.cookies;

  verifyToken(token)
    .then((decode) => {
      req.data = decode;
      next();
    })
    .catch((err) => {
      const error = new GenerateError(401, 'Unauthorized');
      next(error);
    });
};

module.exports = authenticate;
