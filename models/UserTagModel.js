const UserTagModel = (sequelize, type) => {
    return sequelize.define('user_tag', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
    );
};

module.exports = UserTagModel;
