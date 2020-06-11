const LikeUserModel = (sequelize, type) => {
    return sequelize.define('like_user',{
        id: {
            primaryKey: true,
            type: type.INTEGER
        },
    })
};

module.exports = LikeUserModel;
