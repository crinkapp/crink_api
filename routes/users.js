const express = require('express');
const router = express.Router();
const  { getAllUsers, addUser, removeUser, getUser, sendResetPasswordEmail, login } = require('../controllers/UsersController');
const verifyToken = require('../token/verifyToken');
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
 * /user:
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
 * 
 * /getuser:
 *  post:
 *      description: Get a user from User table using email & password
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 * 
 * /sendresetpwd:
 *  post:
 *      description: Send a email with link to reset password
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 */
router.get('/users', getAllUsers);
router.get('/user', getUser);
router.post('/user', addUser);
router.put('/user',verifyToken, removeUser);
router.post('/sendresetpwd', verifyToken, sendResetPasswordEmail);
router.post('/login', login);

module.exports = router;
