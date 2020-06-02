const Settings = require('./SettingModel');
const UsersModel = (sequelize, type) => {
    return sequelize.define('users', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name_user: {
                type: type.STRING,
                allowNull: false,

            },
            gender_user: {
                type: type.ENUM('Man', 'Woman'),
                allowNull: false,
            },
            age_user: {
                type: type.DATEONLY,
                validate: {
                    customValidator(value) {
                        let today = new Date();
                        let currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        let user_age = currentDate - value;
                        console.log(currentDate, " ", user_age);
                        if (user_age < 10) {
                            throw new Error("Vous n'avez pas l'age requis");
                        }
                    },
                    allowNull: false,
                }
            },

            email_user: {
                type: type.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            username_user: {
                    type: type.STRING,
                    allowNull: false,
            },
            password_user: {
                type: type.STRING,
                allowNull: false,
            },
            path_profil_picture_user: {
                type: type.STRING,
                allowNull: true,
            },
            id_settings_user: {
                type: type.INTEGER,
                defaultValue: 1,
                allowNull: true,
                references: {
                    model: 'settings',
                    key: 'id',
                }
            }
        },
    );
};

module.exports = UsersModel;

UsersModel.hasOne(Settings);
