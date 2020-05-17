const express = require('express');
const router = express.Router();
const  { getAllNewsletters, addNewsletter } = require('../controllers/NewslettersController');

/**
 * @swagger
 * /newsletters:
 *  get:
 *      description: All the emails from the newsletter table
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 */
router.get('/', getAllNewsletters);

router.post('/', addNewsletter );

module.exports = router;
