const UserTagModel = (sequelize, type) => {
    return sequelize.define('user_tag', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            is_deletable: {
                type: type.BOOLEAN,
                defaultValue: true
            }
        },
    );
};

module.exports = UserTagModel;
