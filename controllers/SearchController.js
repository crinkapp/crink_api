const sequelize = require('sequelize');
const {
    Publication,
    PublicationTag,
    User
} = require("../sequelize");

async function searchPublicationByTags(req, res) {

    const tagId = req.body.tag_id;

   // return all publications' id where tagId = tag_id
    await PublicationTag.findAll({where: {tagId},
    attributes: ["publicationId"]})
        .then(async(result) =>{
        const publicationIds = result.map((res)=>res.publicationId);
            await Publication.findAll({where: {id: publicationIds}}).then((publications)=>{
                return res.json(publications)
            }).catch((err)=>{
                return res.json(err);
            })
        });
}

async function searchPublicationByAuthorOrTitle(req, res){

    await Publication.findAll({where:
            {
                title_publication:
                    {
                        [sequelize.Op.like]: '%' + req.body.research_field + '%'
                    }
            },
            attributes: ["id"],
            include: [{model:User, attributes:['id']}]}).then(async(result)=>{
                const userIds = result.map((res)=>res.id);
                await Publication.findAll({where: {id: userIds}}).then((publications)=>{
                    return res.json(publications)
                }).catch((err) =>{
                    return res.json(err)
                })
    })
}
module.exports = {
    searchPublicationByTags,
    searchPublicationByAuthorOrTitle
};
