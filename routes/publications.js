const express = require('express');
const router = express.Router();
const { addPublication, updatePublication, deletePublication, getAllPublicationByUser, getAllPublications, getUserPublicationById } = require('../controllers/PublicationController');
const verifyToken = require('../token/verifyToken');

// GET
router.get('/user-publication', verifyToken, getUserPublicationById);
router.get('/all-publications', verifyToken, getAllPublications);
router.get('/all-user-publications', verifyToken, getAllPublicationByUser);

// POST
router.post('/add-publication', verifyToken, addPublication);

// PUT
router.put('/update-publication', verifyToken, updatePublication);

// DELETE
router.delete('/delete-publication', verifyToken, deletePublication);



module.exports= router;
