const LikeUserModel = require("../models/LikeUserModel");
const {
  Publication,
  PublicationTag,
  User,
  LikeUser,
  Comment,
  UserTag,
  Tag,
} = require("../sequelize");
const {
  nbSubscriptionsByUserId,
  nbSubscribersByUserId,
} = require("./SubscriptionController");

// Get the author of the publication
const getAuthorPublication = async (publication) => {
  const user = await User.findOne({
    where: {
      id: publication.userId,
    },
    attributes: { exclude: ["password_user", "birthday_user"] },
  });

  // Get subscribers / subscriptions of user
  await nbSubscriptionsByUserId(user.id).then(
    (total) => (user.dataValues.nbSubscription = total)
  );
  await nbSubscribersByUserId(user.id).then(
    (total) => (user.dataValues.nbSubscribers = total)
  );
  return user;
};

// Get the numbers publication's like
const getPublicationLikeNumber = async (publication) => {
  let nbLikes;
  await LikeUser.count({
    where: { publicationId: publication.id },
  }).then((result) => {
    result > 0 ? (nbLikes = result) : (nbLikes = 0);
  });
  return nbLikes;
};

// Get if local user likes it or not
const likedByActualUser = async (publication, actualUser) => {
  let userLiked;
  await LikeUser.findOne({
    where: {
      userId: actualUser,
      publicationId: publication.id,
    },
  }).then((res) => {
    res !== null ? (userLiked = true) : (userLiked = false);
  });
  return userLiked;
};

// Get the numbers of publication's comment
const getPublicationCommentNumber = async (publication) => {
  let nbComments;
  await Comment.count({
    where: { publicationId: publication.id },
  }).then((result) => {
    result > 0 ? (nbComments = result) : (nbComments = 0);
  });
  return nbComments;
};

// Get all the publication's tags
const getPublicationTags = async (publication) => {
  let tags;
  await PublicationTag.findAll({
    where: { publicationId: publication.id },
    attributes: ["tagId"],
  })
    .then(async (id) => {
      tags = await getTagNames(id);
    })
    .catch((err) => {
      console.log(err);
    });
  return tags;
};

async function getTagNames(tagIds) {
  const ids = tagIds.map((tag) => tag.tagId);
  return await Tag.findAll({
    where: {
      id: ids,
    },
  });
}

// Return an array of Tag ID based of User Tags
async function getTagIdsByUserTags(userId) {
  const tags = await UserTag.findAll({
    where: { userId },
    attributes: ["tagId"],
  });

  // map the array to return only id and not the whole object
  const tagIds = tags.map((tag) => tag.tagId);
  return tagIds;
}

// Get all publication of the application
async function getAllPublications(req, res) {
  try {
    const allPublications = await Publication.findAll({
      raw: true,
    });
    for (let i = 0; i < allPublications.length; i++) {
      await getAuthorPublication(allPublications[i]).then(
        (user) => (allPublications[i].user = user)
      );
      await likedByActualUser(allPublications[i], res.locals.id_user).then(
        (liked) => (allPublications[i].likedByActualUser = liked)
      );
      await getPublicationLikeNumber(allPublications[i]).then(
        (total) => (allPublications[i].nbLikes = total)
      );
      await getPublicationCommentNumber(allPublications[i]).then(
        (total) => (allPublications[i].nbComments = total)
      );
      await getPublicationTags(allPublications[i]).then(
        (tags) => (allPublications[i].hashtags = tags)
      );
    }
    return res.json(allPublications);
  } catch (err) {
    return res.status(400).send("No publications found");
  }
}

// Take an array in parameter and return an array of publication ids
async function getPublicationIdsByTagIds(tagId) {
  let publications = [];
  // id_tags verification array
  if (tagId.length === 0) {
    return new Error("Empty array…");
  }

  try {
    const publicationIds = await PublicationTag.findAll({
      where: { tagId },
      attributes: ["publicationId"],
    });

    publicationIds.map((pub) => {
      publications.push(pub.publicationId);
    });
    return publications;
  } catch (err) {
    return new Error(err);
  }
}

// Get the publications that will appear in local user feed (based on his tags)
async function getPublicationByUserTags(req, res) {
  const user_id = res.locals.id_user;
  try {
    let publicationsForUser;
    await getTagIdsByUserTags(user_id).then(async (tagIds) => {
      await getPublicationIdsByTagIds(tagIds).then(async (id) => {
        await Publication.findAll({
          where: { id },
        }).then((publications) => {
          publicationsForUser = publications
        });
      });
    });
    for (let i = 0; i < publicationsForUser.length; i++) {
      await getAuthorPublication(publicationsForUser[i]).then(
        (user) => (publicationsForUser[i].dataValues.user = user)
      );
      await likedByActualUser(publicationsForUser[i], user_id).then(
        (liked) => (publicationsForUser[i].dataValues.likedByActualUser = liked)
      );
      await getPublicationLikeNumber(publicationsForUser[i]).then(
        (total) => (publicationsForUser[i].dataValues.nbLikes = total)
      );
      await getPublicationCommentNumber(publicationsForUser[i]).then(
        (total) => (publicationsForUser[i].dataValues.nbComments = total)
      );
      await getPublicationTags(publicationsForUser[i]).then(
        (tags) => (publicationsForUser[i].hashtags = tags)
      );
    }
    return res.json(publicationsForUser);
  } catch (err) {
    return res.status(400).send(err);
  }
}

// Get all publication written by the actual user
async function getAllPublicationByUser(req, res) {
  const userId = res.locals.id_user;
  if (userId) {
    try {
      const user_publications = await Publication.findAll({
        where: { userId },
      });
      for (let i = 0; i < user_publications.length; i++) {
        await getAuthorPublication(user_publications[i]).then(
          (user) => (user_publications[i].dataValues.user = user)
        );
        await likedByActualUser(user_publications[i], res.locals.id_user).then(
          (liked) => (user_publications[i].dataValues.likedByActualUser = liked)
        );
        await getPublicationLikeNumber(user_publications[i]).then(
          (total) => (user_publications[i].dataValues.nbLikes = total)
        );
        await getPublicationCommentNumber(user_publications[i]).then(
          (total) => (user_publications[i].dataValues.nbComments = total)
        );
        await getPublicationTags(user_publications[i]).then(
          (tags) => (user_publications[i].dataValues.hashtags = tags)
        );
      }
      return res.json(user_publications);
    } catch (err) {
      return res.status(400).send("Can't find user's publications");
    }
  } else {
    return res.status(400).send("Unknow user id");
  }
}

// Not in use for the moment
async function getUserPublicationById(req, res) {
  const user_id = res.locals.id_user;
  const pub_id = req.body.id;

  if (user_id && pub_id) {
    try {
      const user_publication = await Publication.findOne({
        where: { userId: user_id, id: pub_id },
      });
      return res.json(user_publication);
    } catch (err) {
      return res.status(400).send("Can't find user's publications");
    }
  } else {
    return res.status(400).send("Unknow user id or id publication");
  }
}

// Add a publication
async function addPublication(req, res) {
  const user_id = res.locals.id_user;

  const title = req.body.title;
  const content = req.body.content;
  const media = req.body.media; // array with : name, type, tmp_name, error, size
  const status = "active";
  const hashtags = req.body.hashtags;
  //const nameImg =  media.tmp_name le tmp_name de l'image'
  //const extensionImg = media.type  extension de l'image
  //const path = "https://crink/publication/img/";
  //const md5 = md5(nameImg);
  //const lastPath = path+user_id+"/"+nameImg+"."+extensionImg;
  try {
    // check if user exist
    if (user_id) {
      // create publication and save in db
      const publication = await Publication.create({
        title_publication: title,
        content_publication: content,
        path_media_publication: media, // upload lastPath
        status_publication: status,
        userId: user_id,
      });
      //  save publication and get publication's id
      let publicationId = {};
      await publication.save().then((data) => {
        publicationId = data.dataValues.id;
      });

      // save publication's tags in db
      for (let i = 0; i < hashtags.length; i++) {
        const tags = await PublicationTag.create({
          publicationId: publicationId,
          tagId: hashtags[i].tagId,
        });
        tags.save();
      }
      return res.json("success");

      // if user does not exist
    } else {
      return res.json("can't find user");
    }
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
}

// Update a publication
async function updatePublication(req, res) {
  const publicationExist = await Publication.findOne({
    where: { id: req.body.id },
  });
  const new_values = req.body;
  if (publicationExist && req.body) {
    await Publication.update(new_values, {
      where: { id: req.body.id },
    });
    return res.json("Success update");
  } else {
    return res.json("Unknown id or no data sent to update");
  }
}

// Delete a publication
async function deletePublication(req, res) {
  const user_id = res.locals.id_user;

  const findPublication = await Publication.findOne({
    where: { id: req.body.id },
  });
  if (user_id && findPublication) {
    try {
      await Publication.destroy({ where: { id: req.body.id } });
      return res.json(" Publication Successfully removed");
    } catch (err) {
      return res.status(400).send("bad request");
    }
  } else {
    return res.status(400).send("Can't find publication");
  }
}

module.exports = {
  addPublication,
  updatePublication,
  deletePublication,
  getAllPublicationByUser,
  getAllPublications,
  getUserPublicationById,
  getPublicationByUserTags,
};
