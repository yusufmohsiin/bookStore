const joi = require("joi");

const validateUser = (user) => {
    const schema = joi.object({
      userName: joi.string().min(3).max(100).required(),
      email: joi.string().min(5).max(100).required().email(),
      password: joi.string().min(5).max(100).required(),
    });
    return schema.validate(user);
};

module.exports={
    validateUser,
};

