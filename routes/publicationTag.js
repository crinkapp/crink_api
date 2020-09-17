const express = require("express");
const router = express.Router();
const {
  getAllPublicationTags,
} = require("../controllers/PublicationTagController");
const verifyToken = require("../token/verifyToken");

// GET
router.get("/publication-tag", verifyToken, getAllPublicationTags);

module.exports = router;
