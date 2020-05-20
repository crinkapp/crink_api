module.exports = (sequelize, type) => {
    return sequelize.define('newsletters', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        email_newsletters: {
            type: type.STRING,
            validate: {
                isEmail: true,
            },
            notEmpty: true,
            unique: true
        },

        activate_newsletters:{
            type: type.BOOLEAN,

        },
    })
};
