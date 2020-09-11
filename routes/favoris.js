const express = require('express');
const router = express.Router();
const verifyToken = require('../token/verifyToken');
const {getUserFavorisById, getAllUserFavoris, addFavoris, deleteFavoris, getAllFavorisByPublicationId } = require('../controllers/FavorisController');

//router.get('/user-favoris', verifyToken, getUserFavorisById );
router.get('/all-user-favoris', verifyToken, getAllUserFavoris );
//router.get('/all-publication-favoris', getAllFavorisByPublicationId);
router.post('/favoris', verifyToken, addFavoris );
router.delete('/favoris', verifyToken, deleteFavoris);


module.exports = router;
