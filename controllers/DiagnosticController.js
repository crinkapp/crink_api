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

async function getAllPublicationByDiagnosticResult(req, res){

}

async function addDiagnostic(req, res) {

    const user_id= res.locals.id_user;

    const locks= req.body.locks_diagnostic;
    const hair_texture= req.body.hair_texture_diagnostic;
    const porosity= req.body.porosity_diagnostic;
    const density= req.body.density_diagnostic;
    const thickness= req.body.thickness_diagnostic;
    const curl_pattern= req.body.curl_pattern_diagnostic;
    const distance_between_curls= req.body.distance_between_curls_diagnostic;

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
        .then( async(diagnostic) => {

            let tagIds = [];
            for (const [key, value] of Object.entries(diagnostic.dataValues))
            {
               await Tag.findOne({ where: {
                    name_tag: value,},
                    attributes: ["id"]
                    }).then((result) =>{
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
        })
}

module.exports = {
    addDiagnostic,
    getDiagnostic,
    getUserDiagnostic
};
