const express = require('express');
const router = express.Router();
const Mailer = require('../sequelize');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
    const mail = req.body.email;
    const mailer = new Mailer({
        email: mail
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
        html: "<div style='color: #282727; margin: 0 auto; width: 27rem; border: 1px solid lightgrey; border-radius: 3px;'>" +
        "<div style='display: flex; background-color: #BD6D5C; padding-top: 2rem; padding-bottom: 2rem; justify-content: center; align-items: center; width: 100.5%; border-top-left-radius: 3px; border-top-right-radius: 3px;'>" +
        // "<img src='cid:logo' alt='Crink' height='40' style='display: flex; margin-left: auto; margin-right: auto'></div>" +
        "<div style='width: 100%; padding-top: 3rem; padding-bottom: 3rem; background-color: #FDFAF5; line-height: 1.4rem;'>" +
        "<h3 style='text-align: center; margin-bottom: 4rem; font-weight: 600;'>Merci pour votre inscription <span style='margin-left: 0.6rem;'>🎉</span></h3>" +
        "<div style='padding-left: 2rem; padding-right: 2rem;'>" +
        "<p style='font-weight: 300;'>Toute l'équipe Crink vous souhaite la bienvenue !</p>" +
        "<p style='font-weight: 300;'>Le projet est encore en développement et nous vous prions de bien vouloir patienter avant le jour de lancement. Nous comptons sur vous pour en parler à vos amis qui pourraient être intérressés.</p>" +
        "<p style='font-weight: 300;'>Comme promis, nous vous enverrons un petit message pour vous tenir informé de notre progression. En attendant, n'hésitez pas à faire un tour sur nos réseaux sociaux !</p>" +
        "<p style='font-weight: 300; margin-top: 3rem; margin-bottom: 0;'>Prenez soins de vous et à bientôt !</p>" +
        "<span style='font-weight: 700;'>L'équipe Crink</span>" +
        "<div style='margin: 2rem 0 0;'>" +
        "<a href='https://www.instagram.com/crinkappli/' target='blank' style='text-decoration: none;'><img src='https://image.flaticon.com/icons/png/512/174/174855.png' alt='Instagram' height='30'></a>" +
        "<a href='https://www.linkedin.com/company/42421692' target='blank' style='margin-left: 0.6rem; text-decoration: none;'><img src='https://image.flaticon.com/icons/png/512/174/174857.png' alt='Linkedin' height='30'></a>" +
        "</div></div></div></div>",
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Email sent !');
        }
    });

    mailer
    .save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
});

module.exports = router;
