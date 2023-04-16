const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().required(),

  password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*()_\-+={}[\]:";'<>,.?/])[A-Za-z\d!@#$%^&*()_\-+={}[\]:";'<>,.?/]{8,}$/
  ),

  address: Joi.string().required(),

  phone: Joi.string()
    .pattern(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/)
    .required(),

  forgotPasswordAnswer: Joi.string().min(1).required(),
});

module.exports.userSchema = schema;
