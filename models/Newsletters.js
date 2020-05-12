const Newsletters = (sequelize, type) => {
    return sequelize.define('newsletters', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        newsletter_email: {
            type: type.STRING,
            validate: {
                isEmail: true,
            },
            notEmpty: true,
        },

        newsletter_activate:{
            type: type.INTEGER,

        },
    })
};
 module.exports = Newsletters;
