module.exports = (sequelize, type) => {
    return sequelize.define('setting',{
        id_setting: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        theme_name_setting: type.STRING,
        hexa_code_setting: type.STRING,

    })
};

Settings.belongsTo(UsersModel);
