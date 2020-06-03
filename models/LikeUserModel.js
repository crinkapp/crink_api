const user = require('./UsersModel');
const publication = require('./PublicationModel');
const LikeUserModel = (sequelize, type) => {
    return sequelize.define('like_user',{
        id_like_user: {
            type: type.INTEGER
        },

    })
};
LikeUserModel.belongsTo(user);
LikeUserModel.hasMany(PublicationModel);

