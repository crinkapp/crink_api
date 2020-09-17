const express = require("express");
const router = express.Router();
const {
  addSubscribe,
  getAllSubscriptionByUser,
  getAllSubscribersByUser,
} = require("../controllers/SubscriptionController");
const VerifyToken = require("../token/verifyToken");

router.post("/add-subscribe", VerifyToken, addSubscribe);
router.get("/all-user-subscriptions", VerifyToken, getAllSubscriptionByUser);
router.get("/all-user-subscribers", VerifyToken, getAllSubscribersByUser);

module.exports = router;
