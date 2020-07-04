const express = require('express');
const router = express.Router();
const { addPublication, updatePublication, deletePublication } = require('../controllers/PublicationController');
const verifyToken = require('../token/verifyToken');

router.post('/publication', verifyToken, addPublication);
router.put('/publication', verifyToken, updatePublication);
router.delete('/publication', verifyToken, deletePublication);

module.exports= router;
