const express = require('express');
const router = express.Router();
const  { searchPublicationByTags, searchPublicationByAuthorOrTitle } = require('../controllers/SearchController');

module.exports = router;

router.get('/search-publication-by-tag', searchPublicationByTags);
router.get('/search-publication-by-author', searchPublicationByAuthorOrTitle);
