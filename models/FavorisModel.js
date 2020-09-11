const FavorisModel = (sequelize, type) => {
    return sequelize.define('favoris',{
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true,
        },
    })
};

module.exports = FavorisModel;
