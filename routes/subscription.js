const express = require('express');
const router = express.Router();
const { addSubscribe, getAllSubscriptionByUser } = require('../controllers/SubscriptionController');
const VerifyToken = require('../token/verifyToken');

router.post('/add-subscribe',VerifyToken, addSubscribe);
router.get('/all-user-subscriptions',VerifyToken, getAllSubscriptionByUser);


module.exports = router;
