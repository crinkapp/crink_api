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

/*const updateUserValidation = (data) => {
    const schema = joi.object(
        {
            first_name_user: joi.string(),
            last_name_user: joi.string(),
            email_user: joi.string().min(6).email(),
            username_user: joi.string().min(2),
            birthday_date_user: joi.string()
                .pattern(new RegExp('^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$')),
            password_user: joi.string().min(6),
            gender_user: joi.string(),
            path_profil_picture_user: joi.string()

        }
    );
    return schema.validate(data);


};*/
module.exports = {
    addUserValidation,
    loginValidation,

};

