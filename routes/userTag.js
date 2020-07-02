const express = require('express');
const router = express.Router();
const { getTagsByUser } = require('../controllers/UserTagController');
const verifyToken = require('../token/verifyToken');


router.get('/user-tag', verifyToken, getTagsByUser);

module.exports= router;
