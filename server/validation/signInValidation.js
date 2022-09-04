const Joi = require('joi');

const signInValidation = Joi.object({
  email: Joi
    .string()
    .max(100)
    .min(8)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi
    .string()
    .alphanum()
    .required(),
});

module.exports = signInValidation;
