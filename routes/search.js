const express = require('express');
const router = express.Router();
const  { searchPublicationByTags, searchPublicationByTitle } = require('../controllers/SearchController');
const VerifyToken = require("../token/verifyToken");

module.exports = router;

router.post('/search-publication-by-tag', VerifyToken, searchPublicationByTags);
router.post('/search-publication-by-title', VerifyToken, searchPublicationByTitle);