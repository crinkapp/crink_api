const express = require('express');
const router = express.Router();

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
router.get('/newsletters', getAllNewsletters);

router.post('/newsletter', addNewsletter );

module.exports = router;
