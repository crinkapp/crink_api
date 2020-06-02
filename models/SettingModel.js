const UsersModel = require('./UsersModel');
const Setting = (sequelize, type) => {
        return sequelize.define('settings',{
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            theme_name_setting: type.STRING,
            hexa_code_setting: type.STRING,

        })
    };
module.exports = Setting;

Setting.belongsTo(UsersModel);
