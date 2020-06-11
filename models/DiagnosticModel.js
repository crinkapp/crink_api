const user = require('./UsersModel');
const DiagnosticModel = (sequelize, type) => {
    return sequelize.define('diagnostic',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        locks_diagnostic: {
            type: type.BOOLEAN,
            allowNull: false,
        },
        hair_texture_diagnostic: {
            type: type.ENUM('wavy', 'curly', 'kinky'),
            allowNull: true,
        },
        porosity_diagnostic: {
            type: type.ENUM('low', 'normal', 'high'),
            allowNull: true,
        },
        density_diagnostic: {
            type: type.ENUM('low', 'normal', 'high'),
            allowNull: true,
        },
        thickness_diagnostic: {
            type: type.ENUM('light', 'medium', 'heavy'),
            allowNull: true,
        },
        curl_pattern_diagnostic: {
            type: type.ENUM('o', 's', 'z', 'l'),
            allowNull: true,
        },
        distance_between_curls_diagnostic: {
            type: type.ENUM('loose', 'medium', 'tight', 'very_tight'),
            allowNull: true,
        },
    })
};

module.exports = DiagnosticModel;