const PublicationTagModel = (sequelize, type) => {
    return sequelize.define('publication_tag', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
    );
};

module.exports = PublicationTagModel;
