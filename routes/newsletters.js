const express = require('express');
const router = express.Router();



const  { getAllNewsletters, addNewsletter } = require('../controllers/NewslettersController');

router.get('/newsletters', getAllNewsletters);

router.post('/newsletter', addNewsletter );

module.exports = router;
