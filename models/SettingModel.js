const SettingModel = (sequelize, type) => {
    return sequelize.define('setting',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        theme_name_setting: type.STRING,
        hexa_code_setting: type.STRING,

    })
};

module.exports = SettingModel;
