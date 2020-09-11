const {Favoris, Publication} = require('../sequelize');

// afficher toutes les publications favoris du user
async function getAllUserFavoris(req, res) {

    const user_id = res.locals.id_user;

    if (user_id) {
        try {

            // on récupère tableau d'objet des favoris d'un user
            const allFavoris = await Favoris.findAll({
                attributes: ['publicationId'],
                where: {userId: user_id}
            });
            console.log(allFavoris);

            //on affiche chaque publication à partir de son id
           // for (let i = 0; i < allFavoris.length; i++) {
                const publications = await Publication.findOne({ where: {
                    id: allFavoris[0].id
                    }});

                console.log(publications);
                return res.json(publications);
           // }

        } catch (err) {
            return res.status(400).send("Can't find user's favoris");
        }

    } else {
        return res.status(400).send("Unknow user id");

    }
}

async function addFavoris(req, res) {

    const user_id = res.locals.id_user;
    const publication_id = req.body.publication_id;

    if(publication_id){
    console.log(publication_id);
        try {

            const new_favoris = await Favoris.create({
                publicationId: publication_id,
                userId: user_id,
            });
            await new_favoris.save();
            return res.json("successfully added");

        } catch (err) {
            console.log(err);
            return res.status(400).send("Something went wrong");

        }
    }else{
        return res.status(400).send("publication user not found");
    }
}

//  afficher tous les favoris d'une publication
/*async function getAllFavorisByPublicationId(req, res){

    const publication_id = req.body.publication_id;

    if (publication_id) {
        try {
            const publicationFavoris = await Favoris.findAll({
                where: {publicationId: publication_id}

            });

            for(let i = 0; i < allFavoris.length; i++) {
                const publications = await Publication.findOne({
                    where: {id: allFavoris.publicationId,}
                });
                console.log(publications);
                return res.json(publications);
            }
            return res.json(publicationFavoris);

        } catch (err) {
            return res.status(400).send("Can't find publication's favoris");
        }

    } else {
        return res.status(400).send("Unknow publication id");

    }
}

async function getUserFavorisById(req, res){

}



async function deleteFavoris(req, res) {

    const user_id = res.locals.id_user;

    const findComment = await Comment.findOne({where: {id: req.body.id}});
    if (user_id && findComment) {
        try {
            await Comment.destroy({where: {id: req.body.id, userId: user_id}});
            return res.json(' Comment Successfully removed');

        } catch (err) {
            return res.status(400).send('bad request')
        }
    } else {
        return res.status(400).send("Can't find comment")
    }
}*/
module.exports = {
    getAllUserFavoris,
    addFavoris,
    //getAllFavorisByPublicationId,
    //getUserFavorisById,
    //deleteFavoris




};
