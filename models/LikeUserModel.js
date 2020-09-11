const LikeUserModel = (sequelize, type) => {
    return sequelize.define('like_user',{
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true,
        },
    })
};

module.exports = LikeUserModel;
