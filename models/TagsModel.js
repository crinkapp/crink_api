const TagsModel = (sequelize, type) => {
    return sequelize.define('tag',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_tag: type.STRING,

        isSeen: {
            type: type.BOOLEAN,
            default: true,
        }
    })
};
module.exports = TagsModel;
