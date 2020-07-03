const express = require('express');
const router = express.Router();
const { addPublication } = require('../controllers/PublicationController');
const verifyToken = require('../token/verifyToken');

router.post('/publication', verifyToken, addPublication);

module.exports= router;
