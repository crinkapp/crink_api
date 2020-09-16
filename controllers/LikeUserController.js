const {LikeUser} = require('../sequelize');

async function getAllUserLikes(req, res) {
    const user_id = res.locals.id_user;

    if (user_id) {
        try {
            // on récupère les ids des plublications qu'un user a liké
            const allLikes = await LikeUser.findAll({
                attributes: { exclude: ["id", "createdAt", "updatedAt", "userId"]  },
                where: { userId: user_id },
            });

            return res.json(allLikes);
        } catch (err) {
            return res.status(400).send("Can't find user's likes");
        }
    } else {
        return res.status(400).send("Unknow user id");
    }
}

async function getAllLikeByPublicationId (req, res) {

    const id = req.body.publication_id;

    if (id) {

        try {
            const allPublicationLikes = await LikeUser.findAll({
                where: { publicationId: id },
            });
            return res.json(allPublicationLikes);

        } catch(err){
            return res.status(400).send("Bad request");

        }
    }else{
        return res.status(400).send("Unknow publication id ");

    }

}

async function nbLikesByPublicationId(req, res) {
    const id = req.body.publication_id;

    if (id) {

        try {
            return await LikeUser.count({
                where: { publicationId: id },
            }).then((count)=>{
                    return res.json(count)
            });

        } catch(err){
            return res.status(400).send("Bad request");

        }
    }else{
        return res.status(400).send("Unknow publication id ");

    }
    }

const doesExist = async (id, userId) => {
    return await LikeUser.count({
        where: { publicationId: id, userId: userId },
    }).then((count) => {
        if (count != 0) {
            // If there is likes
            return true;
        }
        return false; // If no likes
    });
};

async function addLike(req, res) {
    const user_id = res.locals.id_user;
    const publication_id = req.body.id;

    // If not empty
    if (publication_id) {
        doesExist(publication_id, user_id).then((exist) => {

            // If like already exist it removes it from database
            if (exist) {
                try {

                    LikeUser.destroy({
                        where: { publicationId: publication_id, userId: user_id },
                    });
                    return res.json("Successfully removed from database :)");
                } catch (err) {
                    return res.status(400).send("Bad request");
                }
            }
        });

        // If not favoris is created
        try {

            const new_like = await LikeUser.create({
                publicationId: publication_id,
                userId: user_id,
            });
            await new_like.save();
            return res.json("successfully added");
        } catch (err) {
            console.log(err);
            return res.status(400).send("Something went wrong");
        }
        // If empty
    } else {
        return res.status(400).send("publication, user not found");
    }

}

    module.exports= {
        nbLikesByPublicationId,
        addLike,
        getAllUserLikes,
        getAllLikeByPublicationId
    };

