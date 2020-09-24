const { Favoris, Publication } = require("../sequelize");
const {
  getAuthorPublication,
  getPublicationLikeNumber,
  likedByActualUser,
  getPublicationCommentNumber,
  getPublicationTags,
  favByActualUser,
} = require("./PublicationController");

// afficher toutes les publications favoris du user
async function getAllUserFavoris(req, res) {
  const user_id = res.locals.id_user;

  if (user_id) {
    try {
      // on récupère tableau d'objet des favoris d'un user
      const allFavoris = await Favoris.findAll({
        attribute: ["publicationId"],
        where: { userId: user_id },
      });

      let publicationIds = [];
      for (let key in allFavoris) {
        publicationIds.push(allFavoris[key].dataValues.publicationId);
      }

      // Get publications by the array of id publications
      await Publication.findAll({
        where: {
          id: publicationIds,
        },
      }).then(async (publications) => {
        for (let i = 0; i < publications.length; i++) {
          await getAuthorPublication(publications[i].dataValues).then(
            (user) => (publications[i].dataValues.user = user)
          );
          await likedByActualUser(publications[i].dataValues, user_id).then(
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
          await favByActualUser(publications[i].dataValues, user_id).then(
            (isFav) => (publications[i].dataValues.favoris = isFav)
          );
        }
        return res.json(publications);
      });
    } catch (err) {
      return res.status(400).send("Can't find user's favoris");
    }
  } else {
    return res.status(400).send("Unknow user id");
  }
}

const doesExist = async (id, userId) => {
  return await Favoris.count({
    where: { publicationId: id, userId: userId },
  }).then((count) => {
    if (count != 0) {
      // If favoris does exist return true
      return true;
    }
    return false; // If favoris doesn't exist return false
  });
};

async function addFavoris(req, res) {
  const user_id = res.locals.id_user;
  const publication_id = req.body.publication_id;

  // If not empty
  if (publication_id) {
    doesExist(publication_id, user_id).then((exist) => {
      // If favoris already exist it removes it from database
      if (exist) {
        try {
          Favoris.destroy({
            where: { publicationId: publication_id, userId: user_id },
          });
          return res.json("Successfully removed from database :)");
        } catch (err) {
          return res.status(400).send("Bad request");
        }
      }
    });

    // If not favoris is created
    try {
      const new_favoris = await Favoris.create({
        publicationId: publication_id,
        userId: user_id,
      });
      await new_favoris.save();
      return res.json("successfully added");
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
    // If empty
  } else {
    return res.status(400).send("publication user not found");
  }
}

async function deleteFavoris(req, res) {
  console.log(`Je récupère ça : ${req.body.id}`);
  const user_id = res.locals.id_user;

  const findFavoris = await Favoris.findOne({ where: { id: req.body.id } });
  if (user_id && findFavoris) {
    try {
      await Favoris.destroy({ where: { id: req.body.id, userId: user_id } });
      return res.json("Successfully removed from database :)");
    } catch (err) {
      return res.status(400).send("Bad request");
    }
  } else {
    return res.status(400).send("Can't find favoris");
  }
}
module.exports = {
  getAllUserFavoris,
  addFavoris,
  deleteFavoris,
};
