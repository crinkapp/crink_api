const express = require('express');
const router = express.Router();
const  { getAllUsers } = require('../controllers/UsersController');

/**
 * @swagger
 * /users:
 *  get:
 *      description: Get all users
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 */
router.get('/users', getAllUsers);

module.exports = router;
