const express = require('express');
const router = express.Router();
const  { getAllUsers, getUser, removeUser, sendResetPasswordEmail, register, login } = require('../controllers/UsersController');
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
 *  get:
 *      description: Get an user
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *  post:
 *      description: Add a new User from Sign Up
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *  delete:
 *      description: Remove a specific user by id from Users model
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
 * 
 * /register:
 *  post:
 *      description: Send a email with link to reset password
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 * 
 * /login:
 *  post:
 *      description: Connect user and pass token to cookie http only
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 * 
 */

 // GET User(s) and REMOVE
router.get('/users', getAllUsers);
router.get('/user', verifyToken, getUser);
router.delete('/user',verifyToken, removeUser);

// POST Email for forgotten password
router.post('/sendresetpwd', verifyToken, sendResetPasswordEmail);

// Register & Login
router.post('/register', register);
router.post('/login', login);

module.exports = router;
