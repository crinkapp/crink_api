const { User, Publication } = require("../sequelize");
const { sendEmail } = require("./NewslettersController");
require("dotenv").config();
const {
  addUserValidation,
  loginValidation,
  updateUserValidation,
} = require("../joi/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  nbSubscriptionsByUserId,
  nbSubscribersByUserId,
  isAlreadySubscribed,
} = require("./SubscriptionController");

const nbPublicationbyUser = async (userId) => {
  try {
    return await Publication.count({
      where: { userId },
    }).then((count) => {
      return count;
    });
  } catch (err) {
    return err;
  }
};

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.findAll({ raw: true });

    // getting subscription / subscribers info
    for (let i = 0; i < allUsers.length; i++) {
      await nbSubscriptionsByUserId(allUsers[i].id).then(
        (total) => (allUsers[i].nbSubscription = total)
      );
      await nbSubscribersByUserId(allUsers[i].id).then(
        (total) => (allUsers[i].nbSubscribers = total)
      );
      await nbPublicationbyUser(allUsers[i].id).then(
        (total) => (allUsers[i].nbPublications = total)
      );
    }
    return res.json(allUsers);
  } catch (err) {
    return res.json(err);
  }
}

async function getUser(req, res) {
  const user_id = res.locals.id_user;
  if (user_id) {
    try {
      const user = await User.findOne({
        where: { id: user_id },
      });
      await nbSubscriptionsByUserId(user_id).then(
        (total) => (user.dataValues.nbSubscription = total)
      );
      await nbSubscribersByUserId(user_id).then(
        (total) => (user.dataValues.nbSubscribers = total)
      );
      await nbPublicationbyUser(user_id).then(
        (total) => (user.dataValues.nbPublications = total)
      );
      return res.json(user);
    } catch (err) {
      return res.status(400).send("Can't find the user");
    }
  } else {
    return res.status(400).send("Unknow user id");
  }
}

async function getUserById(req, res) {
  const actualUser = res.locals.id_user;
  const user_id = req.body.id_user;
  try {
    const user = await User.findOne({
      where: { id: user_id },
    });
    await nbSubscriptionsByUserId(user_id).then(
      (total) => (user.dataValues.nbSubscription = total)
    );
    await nbSubscribersByUserId(user_id).then(
      (total) => (user.dataValues.nbSubscribers = total)
    );
    await nbPublicationbyUser(user_id).then(
      (total) => (user.dataValues.nbPublications = total)
    );
    await isAlreadySubscribed(user_id, actualUser).then((subscribed) =>
      subscribed
        ? (user.dataValues.alreadySubscribed = true)
        : (user.dataValues.alreadySubscribed = false)
    );
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Can't find the user");
  }
}

async function updateUser(req, res) {
  const user_id = res.locals.id_user;
  const new_values = req.body;
  if (req.body) {
    await User.update(new_values, {
      where: { id: user_id },
    });
    return res.json("Success update");
  }
  return res.json("Nothing to update.");
}

async function removeUser(req, res) {
  const idUser = req.body.id_user;
  try {
    await User.destroy({
      where: {
        id: idUser,
      },
    });
    return res.json("Successfully removed user");
  } catch (err) {
    return res.json(err);
  }
}

async function sendResetPasswordEmail(req, res) {
  const mail = req.body.email_user;
  const subject = "Réinitialisation du mot de passe";
  const template = "reset-password";
  const isNewsletter = false;
  await User.findOne({ where: { email_user: mail } }).then((email) => {
    if (email !== null) {
      // if already exist
      sendEmail(mail, subject, template, isNewsletter, res);
    } else {
      // if doesn't exist
      return res.json("Email not found in database, try again.");
    }
  });
}

async function updateUserPwd(req, res) {
  const user_id = req.body.id;
  const newPwd = req.body.new_password;

  // check if password is not null
  if (!newPwd) {
    return res.status(400).send("please enter a new password");
  }
  try {
    // hash the pwd
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPwd, salt);

    // update user password in db
    const updatePwdinDb = await User.build(
      {
        id: user_id,
        password_user: hashedNewPassword,
      },
      { isNewRecord: false }
    );

    // save the password in db
    updatePwdinDb.save();
    return res.json(updatePwdinDb);
  } catch (err) {
    res.json(err);
  }
}

async function register(req, res) {
  //Validate the data before we make a user
  const { error } = addUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database

  const email_user = req.body.email_user;
  const username_user = req.body.username_user;
  const password_user = req.body.password_user;
  const gender_user = req.body.gender_user;
  const role_user = "User";

  const emailExist = await User.findOne({ where: { email_user: email_user } });
  if (emailExist)
    return res
      .status(400)
      .send("Email already exist, please login or use another email.");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password_user, salt);

  // Create a new user
  const user = await User.build({
    email_user: email_user,
    username_user: username_user,
    password_user: hashedPassword,
    gender_user: gender_user,
    path_profil_picture_user: "no_user.jpg",
    role_user: role_user
  });
  user.save();
  if (req.body.newsletter_user) {
    const mail = email_user;
    const subject = "Merci pour votre inscription 🎉";
    const template = "newsletter";
    const isNewsletter = true;
    try {
      sendEmail(mail, subject, template, isNewsletter, res);
    } catch (err) {
      return res.json("You already subscribed to the newsletter");
    }
  } else {
    return res.json(user);
  }
}

async function login(req, res) {
  const email = req.body.email_user;
  const password = req.body.password_user;

  //Validate the data before login a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking the email exist
  const user = await User.findOne({ where: { email_user: email } });
  if (!user) return res.status(400).send("Unknow user, please register");

  // check if password is correct
  const validPass = await bcrypt.compare(password, user.password_user);
  if (!validPass) return res.status(400).send("Incorrect password");

  // create and assign a token to a user
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  //res.header('auth-token', token).send(token);

  // Create a cookie to store the token and send it to the front
  try {
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
      })
      .json("You are now logged in !");
  } catch (err) {
    return res.json(err);
  }
}

async function logout(req, res) {
  res.clearCookie("access_token");
  res.json("Logout success and token successfully cleared !");
}

module.exports = {
  getAllUsers,
  getUser,
  getUserById,
  removeUser,
  sendResetPasswordEmail,
  register,
  login,
  logout,
  updateUserPwd,
  updateUser,
  nbPublicationbyUser,
};
