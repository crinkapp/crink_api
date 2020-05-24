const { User } = require('../sequelize');
const { Newsletters } = require('../sequelize');
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
    try {
        const user = await User.build({
            email_user: req.body.email_user,
            username_user: req.body.username_user,
            password_user: req.body.password_user
        })
        await user.save();
        if (req.body.newsletter_user) {
            const mail = req.body.email_user;
            await Newsletters.findOne({ where: { email_newsletters: mail } })
            .then((email) => {
            if(email !== null) {
                // if already exist
                return res.json('Vous êtes déjà inscrit à la newsletter…');
            } else {
                // if doesn't exist
                const newsletters = new Newsletters({
                    email_newsletters: mail,
                });
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
                        defaultLayout: 'newsletter'
                    },
                    viewPath: path.join(__dirname, '../views'),
                    extName: '.handlebars',
                };
                transporter.use('compile', hbs(handlebarOptions));
                const mailOptions = {
                    from: process.env.EMAIL_ADDRESS,
                    to: mail,
                    subject: "Merci pour votre inscription 🎉",
                    template: 'newsletter',
                    context: {
                        email: mail
                    }
                };
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return res.json(err);
                    }
                    newsletters.save().then(data => {
                        return res.json(data);
                    }).catch(err => {
                        return res.json(err);
                    })
                });
            }
            });
        }
        return res.json(user);
    }
    catch(err) {
        return res.json(err)
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

module.exports = {
    getAllUsers,
    addUser,
    removeUser
};

