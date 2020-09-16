const express = require('express');
const router = express.Router();
const { addSubscribe, getAllSubscriptionByUser, getAllSubscribersByUser, nbSubscriptionsByUserId, nbSubscribersByUserId } = require('../controllers/SubscriptionController');
const VerifyToken = require('../token/verifyToken');

router.post('/add-subscribe',VerifyToken, addSubscribe);
router.get('/all-user-subscriptions',VerifyToken, getAllSubscriptionByUser);
router.get('/all-user-subscribers', VerifyToken, getAllSubscribersByUser);
router.get('/nb-user-subscriptions', VerifyToken, nbSubscriptionsByUserId,);
router.get('/nb-user-subscribers', VerifyToken, nbSubscribersByUserId);


module.exports = router;
