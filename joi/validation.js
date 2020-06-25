const joi = require('@hapi/joi');

// AddUser validation
const addUserValidation = (data) => {
    const schema = joi.object(
        {
            email_user: joi.string().min(6).required().email(),
            username_user: joi.string().min(2).required(),
            password_user: joi.string().min(6).required(),
            gender_user: joi.string().required(),
            newsletter_user: joi.bool()
        }
    );
    return schema.validate(data);

};

const loginValidation = (data) => {
    const schema = joi.object(
        {
            email_user: joi.string().min(6).required().email(),
            password_user: joi.string().min(6).required(),

        }
    );
    return schema.validate(data);

};
module.exports = {
    addUserValidation,
    loginValidation
};

