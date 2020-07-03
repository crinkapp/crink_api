const { Publication, User } = require('../sequelize');

async function addPublication(req, res) {

    const user_id = req.locals.id_user;

    const title = req.body.title_publication;
    const content = req.body.content_publication;
    const media = req.body.path_media_publication;
    const status = 'active';

        try{
            if(User.findOne({where: {id: user_id}})) {
                const publication = Publication.create({
                    title_publication: title,
                    content_publication: content,
                    path_media_publication: media,
                    status_publication: status,
                    userId: user_id

                });
                publication.save;

                return res.json("Publication successuflly added"+" "+ publication)
            }else{
                return res.json("can't find user")
            }
            }catch(err){
            return res.json("Something went wrong")
        }
}

module.exports= {
    addPublication,
}
