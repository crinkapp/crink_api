module.exports = (sequelize, type) => {
    return sequelize.define('settings',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        settings_theme_name: type.STRING,
        settings_hexa_code: type.STRING,

    })
};
