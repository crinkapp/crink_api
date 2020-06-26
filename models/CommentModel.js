const CommentModel = (sequelize, type) => {
    return sequelize.define('comment',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content_comment: {
            type: type.TEXT,
            allowNull: false

        },
        status_comment: {
            type: type.BOOLEAN,
            defaultValue: true
        },

    })
};

module.exports = CommentModel;