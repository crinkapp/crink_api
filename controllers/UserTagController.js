const { UserTag } = require('../sequelize');

async function getTagsByUser(req, res) {
    const user_id = res.locals.id_user;
    if(user_id){
        try {
            const user_tag =  await UserTag.findOne({
                where: {userId: user_id}
            });
            return res.json(user_tag);
        }
        catch(err) {
            return res.status(400).send("Can't find user's tags");
        }

        }

    }
module.exports= {
    getTagsByUser
};
