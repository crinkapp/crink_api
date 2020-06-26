const express = require('express');
const router = express.Router();
const  { addSetting, getSettings } = require('../controllers/SettingController');


router.get('/all', getSettings );
router.post('/', addSetting );
module.exports = router;
