const {
    Publication,
    PublicationTag,
    User,
    Tags
} = require("../sequelize");

async function searchPublicationByTags(req, res) {

    const tagId = req.body.tag_id;

   // return all publications' id where tagId = tag_id
    await PublicationTag.findAll({where: {tagId},
    attributes: ["publicationId"]})
        .then(async(result) =>{
            // return publications from array of publicationIds
        const publicationIds = result.map((res)=>res.publicationId);
            await Publication.findAll({where: {id: publicationIds}}).then((publications)=>{
                return res.json(publications)
            }).catch((err)=>{
                return res.json(err);
            })
        });
}

async function searchPublicationByAuthor(req, res){
    const research_field = req.body.research_field;
    const val = '%'+research_field+'%';
    await User.findAll({where:
            {
                username:
                    {
                        '$like': val
                    }
            },
            attributes: ["userId"]}).then(async(result)=>{
                const userIds = result.map((res)=>res.userId);
                await Publication.findAll({where: {id: userIds}}).then((publications)=>{
                    return res.json(publications)
                }).catch((err) =>{
                    return res.json(err)
                })

    })
}
module.exports = {
    searchPublicationByTags,
    searchPublicationByAuthor
};
