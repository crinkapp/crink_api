const express = require('express');
const router = express.Router();
const { addPublication, updatePublication, deletePublication, getAllPublicationByUser, getAllPublications, getUserPublicationById } = require('../controllers/PublicationController');
const verifyToken = require('../token/verifyToken');

router.get('/user-publication', verifyToken, getUserPublicationById);
router.get('/all-publications', getAllPublications);
router.get('/all-user-publications', verifyToken, getAllPublicationByUser);
router.post('/add-publication', verifyToken, addPublication);
router.put('/update-publication', verifyToken, updatePublication);
router.delete('/delete-publication', verifyToken, deletePublication);



module.exports= router;