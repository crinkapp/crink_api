const Settings = require('./Setting');
 const Users = (sequelize, type) => {
    return sequelize.define('users', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_first_name: {
                type: type.STRING,
                allowNull: false,

            },
            gender: {
                type: type.ENUM('Man', 'Woman'),
                allowNull: false,
            },
            age: {
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

            email: {
                type: type.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            username: {
                    type: type.STRING,
                    allowNull: false,
            },
            password: {
                type: type.STRING,
                allowNull: false,
            },
            path_profil_picture: {
                type: type.STRING,
                allowNull: true,
            },
            id_settings: {
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
Users.hasOne(Settings);
Settings.belongsTo(Users);

module.exports = Users;
