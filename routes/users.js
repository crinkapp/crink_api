const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  getUserById,
  removeUser,
  sendResetPasswordEmail,
  register,
  login,
  logout,
  updateUserPwd,
  updateUser,
} = require("../controllers/UsersController");
const verifyToken = require("../token/verifyToken");
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
 * /send-resetpwd:
 *  post:
 *      description: Send a email with link to reset password
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *
 * /update-user-pwd:
 *  post:
 *      description: Update actual password of uesr
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
 * /logout:
 *  get:
 *      description: Disconnect user by removing cookie in the http only
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Request went well
 *
 */

// GET User(s) and REMOVE
router.get("/users", getAllUsers);
router.get("/user", verifyToken, getUser);
router.post("/user-by-id", verifyToken, getUserById);
router.delete("/user", verifyToken, removeUser);

// Show and update user data
router.put("/user", verifyToken, updateUser);

// POST Email for forgotten password
router.post("/send-reset-pwd", verifyToken, sendResetPasswordEmail);
router.post("/update-user-pwd", updateUserPwd);

// Register & Login
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
