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
            type: type.ENUM('hair_texture_wavy', 'hair_texture_curly', 'hair_texture_kinky'),
            allowNull: true,
        },
        porosity_diagnostic: {
            type: type.ENUM('porosity_low', 'porosity_normal', 'porosity_high'),
            allowNull: true,
        },
        density_diagnostic: {
            type: type.ENUM('density_low', 'density_normal', 'density_high'),
            allowNull: true,
        },
        thickness_diagnostic: {
            type: type.ENUM('thickness_light', 'thickness_medium', 'thickness_heavy'),
            allowNull: true,
        },
        curl_pattern_diagnostic: {
            type: type.ENUM('curl_pattern_o', 'curl_pattern_s', 'curl_pattern_z', 'curl_pattern_l'),
            allowNull: true,
        },
        distance_between_curls_diagnostic: {
            type: type.ENUM('distance_between_curls_loose', 'distance_between_curls_medium', 'distance_between_curls_tight', 'distance_between_curls_very_tight'),
            allowNull: true,
        },

    })
};

module.exports = DiagnosticModel;
