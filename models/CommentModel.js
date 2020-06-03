const User = require('./UsersModel');
const Publication = require('./PublicationModel');
const CommentModel = (sequelize, type) => {
    return sequelize.define('comment',{
        id_comment: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content_comment: {
            type: type.text,
            allowNull: false

        },
        status_comment: {
            type: type.BOOLEAN,
            defaultValue: true
        },

    })
};
CommentModel.belongsTo(User); // will add a userId attribute to CommentModel to hold the primary key value
CommentModel.belongsTo(Publication); // will add a publicationId attribute to CommentModel to hold the primary key value
