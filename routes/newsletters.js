const express = require('express');
const router = express.Router();

const  { getAllNewsletters, addNewsletter } = require('../controllers/NewslettersController');

router.get('/emails', getAllNewsletters);

router.post('/sendemail', addNewsletter );

module.exports = router;
