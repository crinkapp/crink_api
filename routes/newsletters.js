const express = require('express');
const router = express.Router();
const Newsletters = require('../sequelize');
const nodemailer = require('nodemailer');
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
        newsletter_email: mail,
        newsletter_activate: 1
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

    const mailOptions = {
        from: 'contact@crink.fr',
        to: mail,
        subject: "Merci pour votre inscription 🎉",
        text: "Toute l'équipe Crink vous souhaite la bienvenue !",
        html: { path: 'templates/newsletter.html' }
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Email sent !');
        }
    });

    newsletters
    .save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
});

module.exports = router;
