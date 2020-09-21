const express = require('express');
const router = express.Router();
const { addPublication, updatePublication, deletePublication, getAllPublicationByUser, getAllPublications, getUserPublicationById } = require('../controllers/PublicationController');
const verifyToken = require('../token/verifyToken');
var multer = require('multer');
var upload = multer({dest:'uploads/'});

router.get('/user-publication', verifyToken, getUserPublicationById);
router.get('/all-publications', getAllPublications);
router.get('/all-user-publications', verifyToken, getAllPublicationByUser);
router.post('/add-publication', verifyToken, addPublication);
router.post('/add-publication-img',upload.single('file'), verifyToken, addPublication);
router.put('/update-publication', verifyToken, updatePublication);
router.delete('/delete-publication', verifyToken, deletePublication);



module.exports= router;
