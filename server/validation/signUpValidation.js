const Joi = require('joi');

const signUpValidation = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(50)
    .required(),
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi
    .string()
    .alphanum()
    .required(),
  repeat_password: Joi
    .ref('password'),
});

module.exports = signUpValidation;
