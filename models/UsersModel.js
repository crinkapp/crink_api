const UsersModel = (sequelize, type) => {
  return sequelize.define("user", {
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
      type: type.ENUM("Man", "Woman"),
      allowNull: true,
    },
    birthdate_user: {
      type: type.DATEONLY,
      allowNull: true,
    },
    email_user: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
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
    role_user: {
      type: type.ENUM("Admin", "Writter", "User"),
      allowNull: false,
      defaultValue: "User",
    },
  });
};

module.exports = UsersModel;
