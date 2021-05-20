const Joi = require("joi");

//Register Validation

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
const businessRegisterValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().min(3).required(),
    restaurantname: Joi.string().min(3).required(),
    phone: Joi.number().min(3).required(),
    address: Joi.string().min(3).required(),
    city: Joi.string().min(3).required(),
    cnic: Joi.number().min(3).required(),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.businessRegisterValidation = businessRegisterValidation;
module.exports.loginValidation = loginValidation;