const express = require('express');
const router = express.Router();
const  { addSetting } = require('../controllers/SettingController');


router.post('/', addSetting );
module.exports = router;
