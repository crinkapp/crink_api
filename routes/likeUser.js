const express = require('express');
const router = express.Router();
const {nbLikesByPublicationId, addLike} = require('../controllers/LikeUserController');
const verifyToken = require('../token/verifyToken');


module.exports = router;

router.get('/nb-publication-likes', nbLikesByPublicationId);
router.post('/add-like', verifyToken, addLike);
