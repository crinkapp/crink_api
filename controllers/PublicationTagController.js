const { PublicationTag } = require("../sequelize");

async function getAllPublicationTags(req, res) {
  try {
    const publicationTags = await PublicationTag.findAll();
    return res.json(publicationTags);
  } catch (err) {
    return res.error(err);
  }
}

module.exports = {
    getAllPublicationTags
}