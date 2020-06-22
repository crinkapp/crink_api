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
    })
    user.save();
    if (req.body.newsletter_user) {
        const mail = req.body.email_user;
        try {
            sendEmail(mail, res);
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

async function resetPasswordUser(req, res) {
    const mail = req.body.email_user;
    let transporter = nodemailer.createTransport({
        host: 'smtp.ionos.fr',
        port: '465',
        secure: true,
        auth: {
            clientId: process.env.EMAIL_ADDRESS,
            clientSecret: process.env.EMAIL_PASSWORD,
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const handlebarOptions = {
        viewEngine: {
            extname: '.handlebars',
            partialsDir: path.join(__dirname, '../views'),
            layoutsDir: path.join(__dirname, '../views'),
            defaultLayout: 'reset-password'
        },
        viewPath: path.join(__dirname, '../views'),
        extName: '.handlebars',
    };
    transporter.use('compile', hbs(handlebarOptions));
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: mail,
        subject: "Réinitialisation du mot de passe",
        template: 'reset-password',
        context: {
            email: mail
        }
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
}

module.exports = {
    getAllUsers,
    addUser,
    removeUser,
    getUser,
    resetPasswordUser
};

