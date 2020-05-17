const { Newsletters } = require('../sequelize');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();

async function getAllNewsletters( req, res) {
    try {
        const allEmails =  await Newsletters.find();
        res.json(allEmails);

    }
    catch(err) {
        res.json({ message: err })
    }
}

async function addNewsletter( req, res ) {
    const mail = req.body.email_newsletters;
    const newsletters = new Newsletters({
        email_newsletters: mail,
        activate_newsletters: 1
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
        template: 'newsletter'
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.json(err);
        }
        newsletters.save().then(data => {
            return res.json(data);
        }).catch(err => {
            console.log(err);
            return;
        })
    });
}

module.exports = {
    getAllNewsletters,
    addNewsletter,

};


