const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Middleweares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const sendemailRoute = require('./routes/newsletters');
app.use('/', sendemailRoute);


// BOOT THE SERVER
app.listen(3000);


