const TagsModel = (sequelize, type) => {
    return sequelize.define('tag',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_tag: type.STRING,
    })
};
module.exports = TagsModel;
