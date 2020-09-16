const {Subscription, User} = require('../sequelize');


const doesExist = async (id, userId) => {
    return await Subscription.count({
        where: { user_subscription: id, userId: userId },
    }).then((count) => {
        if (count != 0) {
            // If there is likes
            return true;
        }
        return false; // If no likes
    });
};

async function addSubscribe(req, res) {
    const user_id = res.locals.id_user;
    const id = req.body.id;

    // If not empty
    if (id) {
        doesExist(id, user_id).then((exist) => {

            // If the user is already following user_subscriber   it removes it from database
            if (exist) {
                try {

                    Subscription.destroy({
                        where: { user_subscription: id, userId: user_id },
                    });
                    return res.json("Successfully unsubscribed user  :)");
                } catch (err) {
                    return res.status(400).send("Bad request");
                }
            }
        });

        // If user is not following user_subscriber
        try {

            const new_subscriber = await Subscription.create({
                user_subscription: id,
                userId: user_id,
            });
            await new_subscriber.save();
            return res.json("You are now following the user");
        } catch (err) {
            console.log(err);
            return res.status(400).send("Something went wrong");
        }
        // If empty
    } else {
        return res.status(400).send("user id not found");
    }

}

async function getAllSubscriptionByUser(req, res) {
    const user_id = res.locals.id_user;
    if (user_id) {
        try {
            const user_subscriptions = await Subscription.findAll({
                attribute: ["userId"],
                where: { userId: user_id },
            });

            let userIds = [];
            for (let key in user_subscriptions) {
                userIds.push(user_subscriptions[key].dataValues.user_subscription);
            }

            // Get user object by the array of id publications
            const users = await User.findAll({
                where: {
                    id: userIds,
                },
                attributes: { exclude: ["password_user", "diagnosticId", "settingId",  "createdAt", "updatedAt", "email_user", "birthdate_user", "gender_user","last_name_user","first_name_user"] }
            });

            // return all the users which userId subscribe to, (username, and path_to_profil_picture)
            return res.json(users);
        } catch (err) {
            return res.status(400).send("Can't find user's subscriptions");
        }
    } else {
        return res.status(400).send("Unknow user id");
    }
}

async function getAllSubscribersByUser(req, res) {
    const user_id = res.locals.id_user;
    if (user_id) {
        try {
            const user_subscribers = await Subscription.findAll({
                attribute: ["userId"],
                where: {user_subscription: user_id},
            });

            let userIds = [];
            for (let key in user_subscribers) {
                userIds.push(user_subscribers[key].dataValues.user_subscription);
            }

            // Get user object by the array of id user
            const users = await User.findAll({
                where: {
                    id: userIds,
                },
                attributes: {exclude: ["password_user", "diagnosticId", "settingId", "createdAt", "updatedAt", "email_user", "birthdate_user", "gender_user", "last_name_user", "first_name_user"]}
            });

            // return all the users who subscribe to userId  (username, and path_to_profil_picture)
            return res.json(users);
        } catch (err) {
            return res.status(400).send("Can't find user's subscriptions");
        }
    } else {
        return res.status(400).send("Unknow user id");
    }
}

module.exports = {
    addSubscribe,
    getAllSubscriptionByUser,
    getAllSubscribersByUser,
};
