const user = require('./UsersModel');
//const publication = require('./PublicationModel');
const FavorisModel = (sequelize, type) => {
    return sequelize.define('favoris',{
        id: {
            primaryKey: true,
            type: type.INTEGER
        },

    })
};

module.exports = FavorisModel;
