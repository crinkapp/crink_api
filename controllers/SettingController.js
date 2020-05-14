const  { Setting } = require('../sequelize');

async function addSetting ( req, res ) {

    const theme_name= req.body.settings_theme_name;
    const hexa_code= req.body.settings_hexa_code;

    const setting = new Setting({
        theme_name_settings: theme_name,
        hexa_code_settings: hexa_code

    });

    setting
        .save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({message: err})
        })
}

module.exports = {
    addSetting,
};
