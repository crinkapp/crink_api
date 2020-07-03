const express = require('express');
const router = express.Router();
const { getTagsByUser, userAddTags, deleteUserTagById } = require('../controllers/UserTagController');
const verifyToken = require('../token/verifyToken');


/**
 * @swagger
 *
 * /user-tag:
 * post:
 *      description: Add several tags choose by user
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *
 *  get:
 *      description: Get all user's tags
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 * delete:
 *      description: Remove a specific tag by tagId and userId
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 */
router.post('/user-tag', verifyToken, userAddTags);
router.get('/user-tag', verifyToken, getTagsByUser);
router.delete('/user-tag', verifyToken, deleteUserTagById );

module.exports= router;
