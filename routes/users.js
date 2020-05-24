const express = require('express');
const router = express.Router();
const  { getAllUsers, addUser } = require('../controllers/UsersController');

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
router.post('/user', addUser);

module.exports = router;
