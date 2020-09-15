const { Comment } = require("../sequelize");

async function getAllCommentByPublication(req, res) {
  const publication_id = req.body.publication_id;

  if (publication_id) {
    try {
      const publicationComment = await Comment.findAll({
        where: { publicationId: publication_id },
      });

      return res.json(publicationComment);
    } catch (err) {
      return res.status(400).send("Can't find plublication's comment");
    }
  } else {
    return res.status(400).send("Unknow publication id");
  }
}

async function addComment(req, res) {
  const user_id = res.locals.id_user;
  const publication_id = req.body.publication_id;

  if (publication_id) {
    try {
      const new_comment = await Comment.create({
        publicationId: publication_id,
        userId: user_id,
        content_comment: req.body.content,
        status_comment: true,
      });
      await new_comment.save;
      return res.json("successfully added");
    } catch (err) {
      return res.status(400).send("Something went wrong");
    }
  } else {
    return res.status(400).send("id publication not found");
  }
}

async function nbCommentsByPublicationId(req, res) {
  const id = req.body.id;

  if (id) {
    try {
      return await Comment.count({
        where: { publicationId: id },
      }).then((count) => {
        return res.json(count);
      });
    } catch (err) {
      return res.status(400).send("Bad request");
    }
  } else {
    return res.status(400).send("Unknow publication id ");
  }
}

async function updateComment(req, res) {
  const user_id = res.locals.id_user;
  const commentExist = await Comment.findOne({ where: { id: req.body.id } });
  const new_values = req.body;
  if (commentExist && new_values) {
    await Comment.update(new_values, {
      where: { id: req.body.id, userId: user_id },
    });
    return res.json("Success update");
  } else {
    return res.json("Unknown id or no data sent to update");
  }
}

async function deleteComment(req, res) {
  const user_id = res.locals.id_user;

  const findComment = await Comment.findOne({ where: { id: req.body.id } });
  if (user_id && findComment) {
    try {
      await Comment.destroy({ where: { id: req.body.id, userId: user_id } });
      return res.json(" Comment Successfully removed");
    } catch (err) {
      return res.status(400).send("bad request");
    }
  } else {
    return res.status(400).send("Can't find comment");
  }
}
module.exports = {
  getAllCommentByPublication,
  addComment,
  updateComment,
  deleteComment,
  nbCommentsByPublicationId,
};
