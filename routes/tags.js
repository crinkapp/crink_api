const express = require('express');
const router = express.Router();
const  { addTag, getTags, getAllTagsSeen } = require('../controllers/TagsController');
const verifyToken = require('../token/verifyToken');
/**
 * @swagger
 *
 * /tag:
 * post:
 *      description: Add a new Tags. Admin acces only for now
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *
 */
router.post('/tag',verifyToken, addTag);
router.get('/tags', getTags);
router.get('/tags-seen',getAllTagsSeen);

module.exports = router;
