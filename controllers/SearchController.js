const {
    Publication,
    PublicationTag,
    User,
    Tags
} = require("../sequelize");

async function searchPublicationByTags(req, res) {

    const id = req.body.tag_id;

    let publicationsIds ;
    const research = await PublicationTag.findAll({where: {tagId: id},
    attributes: ["publicationId"]}).then((result) =>{
        const publicationIds = result.map((res)=>res.publicationId);
            return res.json(publicationIds);

    });

}
module.exports = {
    searchPublicationByTags
};
