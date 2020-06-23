const { User } = require('../sequelize');
const { sendEmail } = require('../controllers/NewslettersController');
require('dotenv').config();
const { addUserValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');

async function getAllUsers(req, res) {
    try {
        const allUsers =  await User.findAll({raw: true});
        return res.json(allUsers);
    }
    catch(err) {
        return res.json(err)
    }
}

async function addUser(req, res) {

    //Validate the data before we make a user
    const { error } = addUserValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database

     const email_user = req.body.email_user;
     const username_user = req.body.username_user;
     const password_user = req.body.password_user;
     const gender_user = req.body.gender_user;

    console.log(req.body);
    const emailExist = await User.findOne({where: {email_user: email_user}});
    if(emailExist) return res.status(400).send('Cet email existe déjà, veuillez vérifier l\'orthographe ou vous connectez s\'il s\'agit de votre compte');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password_user, salt);


    // Create a new user
    const user = await User.build({
        email_user: email_user,
        username_user: username_user,
        password_user: hashedPassword,
        gender_user: gender_user
    });
    user.save();
    if (req.body.newsletter_user) {
        const mail = email_user;
        const subject = 'Merci pour votre inscription 🎉';
        const template = 'newsletter';
        const isNewsletter = true;
        try {
            sendEmail(mail, subject, template, isNewsletter, res);
        } catch(err) {
            return res.json('Vous êtes déjà inscrit à la newsletter…');
        }
    } else {
        return res.json(user);
    }
}

async function removeUser(req, res) {
    const idUser = req.body.id_user;
    try {
        await User.destroy({
            where: {
                id: idUser
            }
        });
        return res.json('Successfully removed user')
    } catch (err) {
        return res.json(err)
    }
}

async function getUser(req, res) {
    const email = req.body.email_user;
    const password = req.body.password_user;
    try {
        const user = await User.findAll({
            where: {
                email_user: email,
                password_user: password
            }
        });
        return res.json(user);
    } catch(err) {
        return res.json(err);
    }
}

async function sendResetPasswordEmail(req, res) {
    const mail = req.body.email_user;
    const subject = 'Réinitialisation du mot de passe';
    const template = 'reset-password';
    const isNewsletter = false;
    await User.findOne({ where: { email_user: mail } })
    .then((email) => {
      if(email !== null) {
        // if already exist
        sendEmail(mail, subject, template, isNewsletter, res);
    } else {
        // if doesn't exist
        return res.json('Email not found in database, try again.');
      }
    });
}

async function login(req, res) {

    const email = req.body.email_user;
    const password = req.body.password_user;

    //Validate the data before login a user
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking the email exist
    console.log(req.body);
    const user = await User.findOne({where: {email_user: email}});
    if(!user) return res.status(400).send('Identifiants inconnus, veillez-vous inscrire');

    // check if password is correct
    const validPass = await bcrypt.compare(password, user.password_user);
    if(!validPass) return res.status(400).send('Mot de passe incorrect');

    res.send('Connecté !');



}

module.exports = {
    getAllUsers,
    addUser,
    removeUser,
    getUser,
    sendResetPasswordEmail,
    login
};

