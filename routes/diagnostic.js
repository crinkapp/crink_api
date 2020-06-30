const express = require('express');
const router = express.Router();
const  { addDiagnostic, getDiagnostic } = require('../controllers/DiagnosticController');


router.get('/all', getDiagnostic );
router.post('/', addDiagnostic );
module.exports = router;
