const express = require('express');
const router = express.Router();
const  { getAllCommentByPublication, addComment, updateComment, deleteComment, nbCommentsByPublicationId } = require('../controllers/CommentController');
const verifyToken = require('../token/verifyToken');


router.get('/comments', getAllCommentByPublication );
router.get('/nb-publication-comments',nbCommentsByPublicationId );
router.post('/comment', verifyToken, addComment );
router.put('/comment', verifyToken, updateComment);
router.delete('/comment', verifyToken, deleteComment);

module.exports = router;
