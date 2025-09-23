const Joi = require("joi");

const userRegistrationValidation = Joi.object({
    username: Joi.string().required(),
    userId: Joi.string().required(),
    password: Joi.string().required().min(4),
    email: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
        .messages({
            "string.pattern.base": "Invalid email address",
            "string.empty": `Email is required`,
            "any.required": "Please provide Email",
        }),
})
    .options({ abortEarly: false, allowUnknown: true });

const userLoginValidation = Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required().min(4),
})
    .messages({
        "string.empty": "{{#label}} is required",
        "any.required": "Please provide {{#label}}",
        "string.min": "Password must be at least {{#limit}} characters",
    })
    .options({ abortEarly: false, allowUnknown: true });

module.exports = { userRegistrationValidation, userLoginValidation };
