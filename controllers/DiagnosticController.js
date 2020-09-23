const  { Diagnostic, User, UserTag, Tag } = require('../sequelize');


async function getDiagnostic(req, res) {
    try {
        const diagnostic =  await Diagnostic.findAll({raw: true});
        return res.json(diagnostic);
    }
    catch(err) {
        return res.json(err);
    }
}
async function getUserDiagnostic(req, res){

    const user_id= res.locals.id_user;
    try{
        // get user object
        await User.findOne({
            where: {id: user_id},

        }).then( async (user) => {
            // get the diagnostic object belonging to the user
            await Diagnostic.findOne({ where:{
                id: user.id
                }}).then((diagnostic) =>{
                    return res.json(diagnostic)
            });
        });
    }catch(err){
        return res.status(400).send("No publications found");
    }

}

async function addDiagnostic(req, res) {

    const user_id = res.locals.id_user;

    const locks = req.body.locks_diagnostic;
    const hair_texture = req.body.hair_texture_diagnostic;
    const porosity = req.body.porosity_diagnostic;
    const density = req.body.density_diagnostic;
    const thickness = req.body.thickness_diagnostic;
    const curl_pattern = req.body.curl_pattern_diagnostic;
    const distance_between_curls = req.body.distance_between_curls_diagnostic;

    const diagnostic = new Diagnostic({
        locks_diagnostic: locks,
        hair_texture_diagnostic: hair_texture,
        porosity_diagnostic: porosity,
        density_diagnostic: density,
        thickness_diagnostic: thickness,
        curl_pattern_diagnostic: curl_pattern,
        distance_between_curls_diagnostic: distance_between_curls,

    });
    diagnostic
        .save()
        .then(async (diagnostic) => {

            let tagIds = [];
            for (const [key, value] of Object.entries(diagnostic.dataValues)) {
                await Tag.findOne({
                    where: {
                        name_tag: value,
                    },
                    attributes: ["id"]
                }).then((result) => {
                    //tagIds.push(result.dataValues);
                    console.log(result);
                });
            }
            return res.json(tagIds);
        })
        /*.then( async (diagnostic) => {
              await User.update({
                 diagnosticId: diagnostic.dataValues.id},{
                 where: {id: user_id}
             }).save();

        })*/
        .catch(err => {
            return res.send(err);
        });
    {
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
                    {where: {id: user_id}})
            });

        // 2. Remove old diagnostic tags value from User Tags
       for (let i = 1; i < 7; i++) {
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
        console.log("log moi ça " +diagnostic.dataValues);

        //switch case to register diagnostic result as corresponding tags in user-tags table

        switch (filteredDiagnostic) {
            case filteredDiagnostic.locks_diagnostic === true:
                await Tag.findOne({where: {name_tag: 'locks'}, attributes: ["id"]}).then(async (result) => {
                    console.log("log moi ça " +filteredDiagnostic);
                    await UserTag.create({
                        userId: user_id,
                        tagId: result.id,
                        is_deletable: false
                    })
                }).save();
                break;

            case filteredDiagnostic.hair_texture_diagnostic === 'hair_texture_curly':
                await Tag.findOne({where: {name_tag: 'bouclés'}, attributes: ["id"]}).then(async (result) => {
                    await UserTag.create({
                        userId: user_id,
                        tagId: result.id,
                        is_deletable: false
                    })
                }).save();
                break;
            case filteredDiagnostic.hair_texture_diagnostic === 'hair_texture_frizz':
                await Tag.findOne({where: {name_tag: 'frisés'}, attributes: ["id"]}).then(async (result) => {
                    await UserTag.create({
                        userId: user_id,
                        tagId: result.id,
                        is_deletable: false
                    })
                }).save();
                break;
            case filteredDiagnostic.hair_texture_diagnostic === 'hair_texture_kinky':
                await Tag.findOne({where: {name_tag: 'crépus'}, attributes: ["id"]}).then(async (result) => {
                    console.log("log moi ça " +filteredDiagnostic);
                    await UserTag.create({
                        userId: user_id,
                        tagId: result.id,
                        is_deletable: false
                    })
                }).save();
                break;
            case filteredDiagnostic.porosity_diagnostic === 'porosity_low':
            case filteredDiagnostic.porosity_diagnostic === 'porosity_normal':
            case filteredDiagnostic.porosity_diagnostic === 'porosity_high':
                await Tag.findOne({where: {name_tag: 'porosité'}, attributes: ["id"]}).then(async (result) => {
                    await UserTag.create({
                        userId: user_id,
                        tagId: result.id,
                        is_deletable: false
                    })
                }).save();
                break;
            case filteredDiagnostic.density_diagnostic === 'density_low':
            case filteredDiagnostic.density_diagnostic === 'density_normal':
            case filteredDiagnostic.density_diagnostic === 'density_high':
                await Tag.findOne({where: {name_tag: 'densité'}, attributes: ["id"]}).then(async (result) => {
                    await UserTag.create({
                        userId: user_id,
                        tagId: result.id,
                        is_deletable: false
                    })
                }).save();
                break;
            case filteredDiagnostic.thickness_diagnostic === 'thickness_light':
            case filteredDiagnostic.thickness_diagnostic === 'thickness_medium':
            case filteredDiagnostic.thickness_diagnostic === 'thickness_heavy':
                await Tag.findOne({where: {name_tag: 'épaisseur'}, attributes: ["id"]}).then(async (result) => {
                    await UserTag.create({
                        userId: user_id,
                        tagId: result.id,
                        is_deletable: false
                    })
                }).save();
                break;
            default:
                console.log(` ${filteredDiagnostic} not found `);
        }

    }
}

module.exports = {
    getDiagnostic,
    getUserDiagnostic,
    addDiagnostic
};

