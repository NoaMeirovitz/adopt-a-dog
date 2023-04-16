const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
  description: Joi.string().required(),
  imgUrl: Joi.string().required(),
  creatorId: Joi.string().required(),
});

module.exports.petSchema = schema;
