const joi = require("joi");

const validateCreatebook = (book) => {
  const schema = Joi.object({
    title: joi.string().min(5).max(100).required(),
    author: joi.string().min(5).max(100),
    genre: joi.string().min(5).max(100)
  });
  return schema.validate(book);
};

const validateUpdatebook = (bookIdEditService) => {
  const schema = joi.object({
    title: joi.string().min(5).max(100).required(),
    author:joi.string().min(5).max(100),
    genre: joi.string().min(5).max(100),
  });
  return schema.validate(bookIdEditService);
};

module.exports = {
  validateCreatebook,
  validateUpdatebook,
};
