const { UserTag } = require('../sequelize');

async function userAddTags(req, res) {

    const user_id = res.locals.id_user;
    console.log(user_id);
    const data = req.body.tagId; // array with tagId

    if(data){
            for (let i = 0; i<data.length; i++){
               const user_tag = UserTag.create({
                    userId: user_id,
                    tagId: data[i],
                });
               console.log(user_tag);
                await user_tag.save;
            }
        return res.json("successfully added");
    }
    else {
        return res.status(400).send("no data sent");
    }

}
async function getTagsByUser(req, res) {

    const user_id = res.locals.id_user;
    console.log(user_id);

    if(user_id){
        try {
            const user_tags = await UserTag.findAll({
                where: {userId: user_id}
            });
            return res.json(user_tags);

        } catch(err) {
            return res.status(400).send("Can't find user's tags");
        }

    } else {
        return res.status(400).send("Unknow user id");

        }

    }

async function deleteUserTagById(req, res){

    const user_id = res.locals.id_user;
    const tagId = req.body.tagId;
    if(user_id) {
        try {
            if(UserTag.findOne({where: {tagId: tagId}})) {
                await UserTag.destroy({
                    where: {
                        userId: user_id,
                        tagId: tagId // tagId sent by front-end
                    }
                });
                return res.json('Deleted');
            }
            }catch (err) {
                return res.status(400).send("Something went wrong");
            }
    }else {
        return res.status(400).send("Unknow user id");
    }

}
module.exports= {
    getTagsByUser,
    userAddTags,
    deleteUserTagById
};
