module.exports = (sequelize, type) => {
    return sequelize.define('mailer', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: type.STRING
    })
};
