const express = require('express');
const router = express.Router();
const  { getAllUsers, addUser, removeUser, getUser } = require('../controllers/UsersController');

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
 * 
 *  post:
 *      description: Add a new User from Sign Up
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *  put:
 *      description: Remove a specific user by id from Users model
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *  post:
 *      description: Get a user from User table using email & password
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 */
router.get('/users', getAllUsers);
router.post('/user', addUser);
router.put('/user', removeUser);
router.post('/getuser', getUser);

module.exports = router;
