const sequelize = require("sequelize");
const { Publication, PublicationTag, User } = require("../sequelize");
const {
  getAuthorPublication,
  getPublicationLikeNumber,
  likedByActualUser,
  getPublicationCommentNumber,
  getPublicationTags,
  favByActualUser,
} = require("../controllers/PublicationController");

async function searchPublicationByTags(req, res) {
  const tagId = req.body.tag_id;

  // return all publications' id where tagId = tag_id
  await PublicationTag.findAll({
    where: { tagId },
    attributes: ["publicationId"],
  }).then(async (result) => {
    const publicationIds = result.map((res) => res.publicationId);
    await Publication.findAll({ where: { id: publicationIds } })
      .then(async (publications) => {
        // let publicationsByTags = publications;
        for (let i = 0; i < publications.length; i++) {
          await getAuthorPublication(publications[i].dataValues).then(
            (user) => (publications[i].dataValues.user = user)
          );
          await likedByActualUser(publications[i].dataValues, res.locals.id_user).then(
            (liked) => (publications[i].dataValues.likedByActualUser = liked)
          );
          await getPublicationLikeNumber(publications[i].dataValues).then(
            (total) => (publications[i].dataValues.nbLikes = total)
          );
          await getPublicationCommentNumber(publications[i].dataValues).then(
            (total) => (publications[i].dataValues.nbComments = total)
          );
          await getPublicationTags(publications[i].dataValues).then(
            (tags) => (publications[i].dataValues.hashtags = tags)
          );
          await favByActualUser(publications[i].dataValues, res.locals.id_user).then(
            (isFav) => (publications[i].dataValues.favoris = isFav)
          );
        }
        return res.json(publications);
      })
      .catch((err) => {
        return res.json(err);
      });
  });
}

async function searchPublicationByAuthorOrTitle(req, res) {
  await Publication.findAll({
    where: {
      title_publication: {
        [sequelize.Op.like]: "%" + req.body.research_field + "%",
      },
    },
    // include: [{ model: User, attributes: ["username_user"] }],
  })
    .then((publications) => {
      return res.json(publications);
    })
    .catch((err) => {
      return res.json(err);
    });
}
module.exports = {
  searchPublicationByTags,
  searchPublicationByAuthorOrTitle,
};
