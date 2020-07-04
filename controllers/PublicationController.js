const { Publication } = require('../sequelize');

async function addPublication(req, res) {

    const user_id = res.locals.id_user;

    const title = req.body.title;
    const content = req.body.content;
    const media = req.body.media;
    const status = 'active';

        try{
            if(user_id) {
                const publication =  await Publication.create({
                    title_publication: title,
                    content_publication: content,
                    path_media_publication: media,
                    status_publication: status,
                    userId: user_id

                });
                publication.save;
                return res.json("Publication successuflly added")

            }else{
                return res.json("can't find user")
            }
            }catch(err){
                return res.status(400).send("Something went wrong")
        }
}

async function updatePublication(req, res){

        const publicationExist = await Publication.findOne({where: {id: req.body.id}});
        const new_values = req.body;
        if(publicationExist && req.body) {
            await Publication.update(
                new_values, {
                    where: {id: req.body.id}
                });
            return res.json('Success update');
        }else{
            return res.json('Unknown id or no data sent to update');

        }
}
module.exports= {
    addPublication,
    updatePublication
};
