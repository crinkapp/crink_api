const TagsModel = (sequelize, type) => {
    return sequelize.define('tag',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_tag: type.STRING,

        is_seen: {
            type: type.BOOLEAN,
            default: true,
        },
        path_image: {
            type: type.STRING,
        }
    })
};
module.exports = TagsModel;
