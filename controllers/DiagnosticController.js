const {Diagnostic, User, UserTag, Tag} = require("../sequelize");

async function getDiagnostic(req, res) {
    try {
        const diagnostic = await Diagnostic.findAll({raw: true});
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
            where: {id: user_id},
        }).then(async (user) => {
            // get the diagnostic object belonging to the user
            await Diagnostic.findOne({
                where: {
                    id: user.id,
                },
            })
          .then((diagnostic) => {
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
                {diagnosticId: diagnostic.dataValues.id},
                {
                    where: {id: user_id}
                })
        })
        .catch(err => {
            return res.send(err);
        });

    // 3. Get all the ID tags from diagnostic answers
    // Remove useless values (id, createdAt and updatedAt)
    const filteredDiagnostic = diagnostic.dataValues;
    delete filteredDiagnostic.id;
    delete filteredDiagnostic.createdAt;
    delete filteredDiagnostic.updatedAt;

    //switch case to register diagnostic result as corresponding tags in user-tags table
    console.log(filteredDiagnostic);


    if(filteredDiagnostic.locks_diagnostic){
        await Tag.findOne({where: {name_tag: 'locks'}, attributes: ["id"]}).then(async (result) => {
            console.log("log moi ça ");
            await UserTag.create({
                userId: user_id,
                tagId: result,
                is_deletable: false
            })
        }).save();
    }
    switch (filteredDiagnostic.hair_texture_diagnostic) {
        case "hair_texture_curly":
            await Tag.findOne({where: {name_tag: 'bouclé'}, attributes: ["id"]}).then(async (result) => {
                await UserTag.create({
                    userId: user_id,
                    tagId: result,
                    is_deletable: false
                })
            }).save();
            break;
        case "hair_texture_frizz":
            await Tag.findOne({where: {name_tag: 'frisé'}, attributes: ["id"]}).then(async (result) => {
                await UserTag.create({
                    userId: user_id,
                    tagId: result,
                    is_deletable: false
                })
            }).save();
            break;
        case "hair_texture_kinky" :
            await Tag.findOne({where: {name_tag: 'crépus'}, attributes: ["id"]}).then(async (result) => {
                console.log("log moi ça " + filteredDiagnostic);
                await UserTag.create({
                    userId: user_id,
                    tagId: result,
                    is_deletable: false
                })
            }).save();
            break;
        default:
            console.log(`${filteredDiagnostic.hair_texture_diagnostic} is empty.`);
    }
    switch (filteredDiagnostic.porosity_diagnostic) {
        case "porosity_low":
        case "porosity_normal":
        case "porosity_high":
            await Tag.findOne({where: {name_tag: 'porosité'}, attributes: ["id"]}).then(async (result) => {
                await UserTag.create({
                    userId: user_id,
                    tagId: result,
                    is_deletable: false
                })
            }).save();
            break;
        default:
            console.log(`${filteredDiagnostic.porosity_diagnostic} is empty.`);
    }
    switch (filteredDiagnostic.density_diagnostic) {
        case "density_low":
        case "density_normal":
        case "density_high":
            await Tag.findOne({where: {name_tag: 'densité'}, attributes: ["id"]}).then(async (result) => {
                await UserTag.create({
                    userId: user_id,
                    tagId: result,
                    is_deletable: false
                })
            }).save();
            break;
        default:
            console.log(`${filteredDiagnostic.density_diagnostic} is empty.`);
    }
    switch (filteredDiagnostic.thickness_diagnostic) {
        case "thickness_light":
        case "thickness_medium":
        case "thickness_heavy":
            await Tag.findOne({where: {name_tag: 'épaisseur'}, attributes: ["id"]}).then(async (result) => {
                await UserTag.create({
                    userId: user_id,
                    tagId: result,
                    is_deletable: false
                })
            }).save();
            break;
        default:
            console.log(`${filteredDiagnostic.density_diagnostic} is empty.`);
    }
}

module.exports = {
    addDiagnostic,
    getDiagnostic,
    getUserDiagnostic
};
