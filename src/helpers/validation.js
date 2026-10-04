const Joi = require("joi");

// bcrypt only uses the first 72 bytes of a password, so cap it there
const PASSWORD_MAX_LENGTH = 72;

const userRegistrationValidation = Joi.object({
    username: Joi.string().trim().max(100).required(),
    userId: Joi.string().trim().lowercase().max(50).required(),
    password: Joi.string().required().min(8).max(PASSWORD_MAX_LENGTH),
    email: Joi.string()
        .trim()
        .lowercase()
        .max(254)
        .email()
        .required()
        .messages({
            "string.email": "Invalid email address",
            "string.empty": `Email is required`,
            "any.required": "Please provide Email",
        }),
})
    .options({ abortEarly: false, allowUnknown: true, stripUnknown: true });

const userLoginValidation = Joi.object({
    userId: Joi.string().trim().lowercase().max(50).required(),
    // No min() here: login must not reveal the password policy
    password: Joi.string().required().max(PASSWORD_MAX_LENGTH),
})
    .messages({
        "string.empty": "{{#label}} is required",
        "any.required": "Please provide {{#label}}",
    })
    .options({ abortEarly: false, allowUnknown: true, stripUnknown: true });

const bookValidation = Joi.object({
    title: Joi.string().trim().max(200).required(),
    author: Joi.string().trim().max(200).required(),
    ISBN: Joi.string().trim().max(20).required(),
    publisher: Joi.string().trim().max(200).required(),
    price: Joi.number().positive().required(),
    language: Joi.string().trim().max(50).required(),
})
    .options({ abortEarly: false, allowUnknown: true, stripUnknown: true });

const bookPriceValidation = Joi.object({
    price: Joi.number().positive().required(),
})
    .options({ abortEarly: false, allowUnknown: true, stripUnknown: true });

module.exports = {
    userRegistrationValidation,
    userLoginValidation,
    bookValidation,
    bookPriceValidation,
};
