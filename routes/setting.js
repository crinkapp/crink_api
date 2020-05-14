const express = require('express');
const router = express.Router();
const  { addSetting } = require('../controllers/SettingController');


router.post('/settings', addSetting );
module.exports = router;
