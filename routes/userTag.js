const express = require('express');
const router = express.Router();
const { getTagsByUser, userAddTags } = require('../controllers/UserTagController');
const verifyToken = require('../token/verifyToken');


router.get('/user-tag', verifyToken, getTagsByUser);
router.post('/user-tag', verifyToken, userAddTags);

module.exports= router;
