const express = require('express');
const router = express.Router();
const  { addDiagnostic, getDiagnostic, getUserDiagnostic } = require('../controllers/DiagnosticController');
const verifyToken = require('../token/verifyToken');

router.get('/all', getDiagnostic );
router.post('/', verifyToken, addDiagnostic );
router.get('/user-diagnostic',verifyToken, getUserDiagnostic);
module.exports = router;
