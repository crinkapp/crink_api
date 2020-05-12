module.exports = (sequelize, type) => {
    return sequelize.define('newsletters', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: type.STRING,
        activate:{
            type: type.INTEGER,

        },
    })
};
