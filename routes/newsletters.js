const express = require('express');
const router = express.Router();
const  { getAllNewsletters, addNewsletter, unsubscribeUser } = require('../controllers/NewslettersController');

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
 *  post:
 *      description: Send an email to the subscriber
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *  put:
 *      description: Unsubscribe the user of the newsletter by deleting the row in database
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 */
router.get('/', getAllNewsletters);
router.post('/', addNewsletter );
router.put('/', unsubscribeUser );

module.exports = router;
