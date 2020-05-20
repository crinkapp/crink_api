const express = require('express');
const router = express.Router();
const Mailer = require('../sequelize');

router.post('/', (req, res)=> {
    const mailer = new Mailer({
        email: req.body.email
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
