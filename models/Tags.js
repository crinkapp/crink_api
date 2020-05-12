const Tags = (sequelize, type) => {
    return sequelize.define('tags',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tag_name: type.STRING,
    })
};
module.exports = Tags;
