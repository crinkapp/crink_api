const { Publication } = require('../sequelize');

async function getAllPublications(req, res){

    try {
        const allUPublications =  await Publication.findAll({raw: true});
        return res.json(allUPublications);
    }
    catch(err) {
        return res.status(400).send('No publications found');
    }
}

async function getAllPublicationByUser(req, res){

    const user_id = res.locals.id_user;
    if(user_id){
        try {
            const user_publications = await Publication.findAll({
                where: {userId: user_id}
            });
            return res.json(user_publications);

        } catch(err) {
            return res.status(400).send("Can't find user's publications");
        }

    } else {
        return res.status(400).send("Unknow user id");

    }
}

async function getUserPublicationById(req, res){

    const user_id = res.locals.id_user;
    const pub_id = req.body.id;

    if(user_id && pub_id){
        try {
            const user_publication = await Publication.findOne({
                where: {userId: user_id, id: pub_id}
            });
            return res.json(user_publication);

        } catch(err) {
            return res.status(400).send("Can't find user's publications");
        }

    } else {
        return res.status(400).send("Unknow user id or id publication");

    }



}

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

async function deletePublication(req, res){

    const user_id = res.locals.id_user;

    const findPublication = await Publication.findOne({where: {id: req.body.id}});
    if(user_id && findPublication ){
        try{
            await Publication.destroy({where: {id: req.body.id}});
            return res.json(' Publication Successfully removed');

        }catch (err) {
            return res.status(400).send('bad request')
        }
    }else{
        return res.status(400).send("Can't find publication")
    }
}
module.exports= {
    addPublication,
    updatePublication,
    deletePublication,
    getAllPublicationByUser,
    getAllPublications,
    getUserPublicationById
};
