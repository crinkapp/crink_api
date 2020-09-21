const sequelize = require("../sequelize");

const SubscriptionModel = (sequelize, type) => {
    return sequelize.define('subscription',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_subscription: {
            type: type.INTEGER,
            allowNull: false
        },
    })
};

module.exports = SubscriptionModel;
