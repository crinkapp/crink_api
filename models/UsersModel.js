const UsersModel = (sequelize, type) => {
    return sequelize.define('user', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name_user: {
                type: type.STRING,
                allowNull: true,

            },
            last_name_user: {
                type: type.STRING,
                allowNull: true,

            },
            gender_user: {
                type: type.ENUM('Man', 'Woman'),
                allowNull: true,
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
                    allowNull: true,
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
        },
    );
};

module.exports = UsersModel;
