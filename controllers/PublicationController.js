const { Publication, User } = require('../sequelize');

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
module.exports= {
    addPublication,
};
