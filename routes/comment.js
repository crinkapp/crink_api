const express = require('express');
const router = express.Router();
const  { getAllCommentByPublication, addComment, updateComment, deleteComment } = require('../controllers/CommentController');
const verifyToken = require('../token/verifyToken');


router.get('/comments', getAllCommentByPublication );
router.post('/comment', verifyToken, addComment );
router.put('/comment', verifyToken, updateComment);
router.deleteComment('/comment', verifyToken, deleteComment);

module.exports = router;
