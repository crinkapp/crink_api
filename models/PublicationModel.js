const PublicationModel = (sequelize, type) => {
    return sequelize.define('publication',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title_publication: {
            type: type.STRING,
            allowNull: false,
        },
        content_publication: {
            type: type.STRING,
            allowNull: false,
        },
        path_media_publication: {
            type: type.STRING,
            allowNull: true,
        },
        time_to_read_publication: {
            type: type.INTEGER,
            allowNull: true,
        },
        status_publication: {
            type: type.ENUM('active', 'warning', 'inactive'),
            allowNull: true,
        },
    })    
};

module.exports = PublicationModel;