const express = require('express');
const router = express.Router();
const  { searchPublicationByTags } = require('../controllers/SearchController');

module.exports = router;

router.get('/search-publication-by-tag', searchPublicationByTags);
