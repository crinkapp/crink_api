const SubscriptionModel = require("../sequelize");

const SignaledModel = (sequelize, type) => {
    return sequelize.define('signaled',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_signaled: {
            type: type.STRING,
            allowNull: true
        },
        comment_signaled: {
            type: type.TEXT,
            allowNull: true
        },

    })
};

module.exports = SignaledModel;
