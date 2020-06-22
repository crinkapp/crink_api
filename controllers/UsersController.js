const { User } = require('../sequelize');
const  { sendEmail } = require('../controllers/NewslettersController');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();

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
    const user = await User.build({
        email_user: req.body.email_user,
        username_user: req.body.username_user,
        password_user: req.body.password_user
    });
    user.save();
    if (req.body.newsletter_user) {
        const mail = req.body.email_user;
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

module.exports = {
    getAllUsers,
    addUser,
    removeUser,
    getUser,
    sendResetPasswordEmail
};

