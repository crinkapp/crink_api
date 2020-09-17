const { Subscription, User } = require("../sequelize");

const isAlreadySubscribed = async (user_subscription, userId) => {
  return await Subscription.count({
    where: { user_subscription, userId },
  }).then((count) => {
    if (count != 0) {
      // If actual user already subscribed to the user
      return true;
    }
    // If actual user isn't yet subscribd to the user
    return false;
  });
};

async function addSubscribe(req, res) {
  const userId = res.locals.id_user; // actual user
  const id = req.body.id; // id of user we want to susbscribe to

  // If empty, return error
  if (!id) {
    return res.status(400).send("user id not found");
  }

  isAlreadySubscribed(id, userId).then((exist) => {
    // If the user is already following user_subscriber it removes it from database
    if (exist) {
      try {
        Subscription.destroy({
          where: { user_subscription: id, userId },
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
      userId,
    });
    await new_subscriber.save();
    return res.json("You are now following the user");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
}

async function getAllSubscriptionByUser(req, res) {
  const userId = res.locals.id_user;

  if (!userId) {
    return res.status(400).send("Unknow user id");
  }

  try {
    const user_subscriptions = await Subscription.findAll({
      attributes: ["user_subscription"],
      where: { userId },
    });

    const userIds = user_subscriptions.map((user) => user.user_subscription);

    // Get user object by the array of id publications
    const users = await User.findAll({
      where: {
        id: userIds,
      },
      attributes: ["id", "username_user", "path_profil_picture_user"],
    });

    // return all the users which userId subscribe to, (username, and path_to_profil_picture)
    return res.json(users);
  } catch (err) {
    return res.status(400).send("Can't find user's subscriptions");
  }
}

async function getAllSubscribersByUser(req, res) {
  const user_subscription = res.locals.id_user;

  if (!user_subscription) {
    return res.status(400).send("Unknow user id");
  }

  try {
    const user_subscribers = await Subscription.findAll({
      attribute: ["userId"],
      where: { user_subscription },
    });

    const userIds = user_subscribers.map((user) => user.userId);

    // Get user object by the array of id user
    const users = await User.findAll({
      where: {
        id: userIds,
      },
      attributes: ["id", "username_user", "path_profil_picture_user"],
    });

    // return all the users who subscribe to userId  (username, and path_to_profil_picture)
    return res.json(users);
  } catch (err) {
    return res.status(400).send("Can't find user's subscriptions");
  }
}

async function nbSubscriptionsByUserId(req, res) {
  const user_id = res.locals.id_user;

  if (!user_id) {
    return res.status(400).send("Unknow user id ");
  }

  try {
    return await Subscription.count({
      where: { userId: user_id },
    }).then((count) => {
      return res.json(count);
    });
  } catch (err) {
    return res.status(400).send("Bad request");
  }
}

async function nbSubscribersByUserId(req, res) {
  const user_id = res.locals.id_user;

  if (!user_id) {
    return res.status(400).send("Unknow user id ");
  }

  try {
    return await Subscription.count({
      where: { user_subscription: user_id },
    }).then((count) => {
      return res.json(count);
    });
  } catch (err) {
    return res.status(400).send("Bad request");
  }
}
module.exports = {
  addSubscribe,
  getAllSubscriptionByUser,
  getAllSubscribersByUser,
  nbSubscriptionsByUserId,
  nbSubscribersByUserId,
};
