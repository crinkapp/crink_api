const { Diagnostic, User, UserTag, Tag } = require("../sequelize");

async function getDiagnostic(req, res) {
  try {
    const diagnostic = await Diagnostic.findAll({ raw: true });
    return res.json(diagnostic);
  } catch (err) {
    return res.json(err);
  }
}
async function getUserDiagnostic(req, res) {
  const user_id = res.locals.id_user;
  try {
    // get user object
    await User.findOne({
      where: { id: user_id },
    }).then(async (user) => {
      // get the diagnostic object belonging to the user
      await Diagnostic.findOne({
        where: {
          id: user.id,
        },
      }).then((diagnostic) => {
        return res.json(diagnostic);
      });
    });
  } catch (err) {
    return res.status(400).send("No publications found");
  }
}


async function addDiagnostic(req, res) {
  const user_id = res.locals.id_user;
  const locks_diagnostic = req.body.locks_diagnostic;
  const hair_texture_diagnostic = req.body.hair_texture_diagnostic;
  const porosity_diagnostic = req.body.porosity_diagnostic;
  const density_diagnostic = req.body.density_diagnostic;
  const thickness_diagnostic = req.body.thickness_diagnostic;
  const curl_pattern_diagnostic = req.body.curl_pattern_diagnostic;
  const distance_between_curls_diagnostic =
    req.body.distance_between_curls_diagnostic;

  const diagnostic = new Diagnostic({
    locks_diagnostic,
    hair_texture_diagnostic,
    porosity_diagnostic,
    density_diagnostic,
    thickness_diagnostic,
    curl_pattern_diagnostic,
    distance_between_curls_diagnostic,
  });
  diagnostic
    .save()
    .then(async (diagnostic) => {
      // 1. Add diagnostic ID to user table
      await User.update(
        { diagnosticId: diagnostic.dataValues.id },
        { where: { id: user_id } }
      );

      // 2. Remove old diagnostic tags value from User Tags
      for (let i = 1; i < 21; i++) {
        await UserTag.destroy({
          where: {
            userId: user_id,
            tagId: i
          }
        })
      }

      // 3. Get all the ID tags from diagnostic answers
      // Remove useless values (id, createdAt and updatedAt)
      const filteredDiagnostic = diagnostic.dataValues;
      delete filteredDiagnostic.id;
      delete filteredDiagnostic.createdAt;
      delete filteredDiagnostic.updatedAt;

      for (const [key, value] of Object.entries(filteredDiagnostic)) {
        // TODO: Locks will be added later
        if (key !== "locks_diagnostic") {
          await Tag.findOne({
            where: {
              name_tag: value,
            },
            attributes: ["id"],
          }).then(async (result) => {
            // 4. Pass tag ID to USER TAG
            await UserTag.create({
              userId: user_id,
              tagId: result.dataValues.id,
            });
          });
        }
      }
      return res.json(diagnostic);
    })
    .catch((err) => {
      return res.send(err);
    });
}

module.exports = {
  addDiagnostic,
  getDiagnostic,
  getUserDiagnostic,
};
