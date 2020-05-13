const express = require('express');
const router = express.Router();
const Newsletters = require('../sequelize');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

require('dotenv').config();

router.get('/emails', async (req, res) => {

    try {
        const allEmails =  await Newsletters.find();
        res.json(allEmails);

    }
    catch(err) {
        res.json({ message: err })
    }

});

router.post('/sendemail', async (req, res) => {
    const mail = req.body.email;
    const newsletters = new Newsletters({
        newsletters_email: mail,
        newsletters_activate: 1
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
    }

    transporter.use('compile', hbs(handlebarOptions));

    const mailOptions = {
        from: 'contact@crink.fr',
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
});

module.exports = router;
