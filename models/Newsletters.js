const Newsletters = (sequelize, type) => {
    return sequelize.define('newsletters', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        newsletters_email: {
            type: type.STRING,
            validate: {
                isEmail: true,
            },
            notEmpty: true,
        },

        newsletters_activate:{
            type: type.INTEGER,

        },
    })
};
 module.exports = Newsletters;
