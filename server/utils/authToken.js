const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const generateToken = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, secretKey, (err, token) => {
    if (err) return reject(err);
    return resolve(token);
  });
});

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, secretKey, (err, result) => {
    if (err) return reject(err);
    return resolve(result);
  });
});

module.exports = { generateToken, verifyToken };
