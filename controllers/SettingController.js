const  { Setting } = require('../sequelize');

async function addSetting ( req, res ) {

    const theme_name= req.body.settings_theme_name;
    const hexa_code= req.body.settings_hexa_code;

    const setting = new Setting({
        theme_name_setting: theme_name,
        hexa_code_setting: hexa_code

    });

    setting
        .save()
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            return res.json({message: err})
        })
}

module.exports = {
    addSetting,
};
