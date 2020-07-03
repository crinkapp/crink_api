const express = require('express');
const router = express.Router();
const  { addTag, getTags } = require('../controllers/TagsController');
const verifyToken = require('../token/verifyToken');
/**
 * @swagger
 *
 * /tag:
 * post:
 *      description: Add a new User from Sign Up
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *
 */
router.post('/tag',verifyToken, addTag);
router.get('/tags', getTags);

module.exports = router;
