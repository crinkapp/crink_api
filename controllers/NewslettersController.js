const { Newsletters } = require('../sequelize');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();

async function getAllNewsletters(req, res) {
    try {
        const allEmails =  await Newsletters.findAll({raw: true});
        return res.json(allEmails);
    }
    catch(err) {
        return res.json(err)
    }
}

async function addNewsletter(req, res ) {
    const mail = req.body.email_newsletters;
    await Newsletters.findOne({ where: { email_newsletters: mail } })
    .then((email) => {
      if(email !== null) {
        // if already exist
        return res.json('Vous êtes déjà inscrit !');
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

async function unsubscribeUser(req, res) {
    const userEmail = req.body.email_newsletters;
    try {
        await Newsletters.destroy({
            where: {
                email_newsletters: userEmail
            }
        });
        return res.json('Successfully unsubscribed')

    } catch (err) {
        return res.json(err)
    }
}

module.exports = {
    getAllNewsletters,
    addNewsletter,
    unsubscribeUser
};


