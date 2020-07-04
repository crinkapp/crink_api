const express = require('express');
const router = express.Router();
const { addPublication, updatePublication } = require('../controllers/PublicationController');
const verifyToken = require('../token/verifyToken');

router.post('/publication', verifyToken, addPublication);
router.put('/publication', verifyToken, updatePublication);

module.exports= router;
