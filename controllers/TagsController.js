const { Tag } = require("../sequelize");

async function addTag(req, res) {
  const name_tag = req.body.name_tag;
  const tag = new Tag({
    name_tag,
    isSeen: true,
  });

  tag
    .save()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.json({ message: err });
    });
}

async function getTags(req, res) {
  try {
    const tags = await Tag.findAll({ raw: true });
    return res.json(tags);
  } catch (err) {
    return res.json(err);
  }
}

async function getAllTagsSeen(req, res) {
  try {
    const tagsSeen = await Tag.findAll({ where: { isSeen: true } });
    return res.json(tagsSeen);
  } catch (err) {
    return res.json(err);
  }
}
module.exports = {
  addTag,
  getTags,
  getAllTagsSeen,
};
