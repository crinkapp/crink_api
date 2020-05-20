const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Middleweares
app.use(bodyParser.json());

// Import Routes
const sendemailRoute = require('./routes/mailer');
app.use('/', sendemailRoute);


// BOOT THE SERVER
app.listen(3000);


