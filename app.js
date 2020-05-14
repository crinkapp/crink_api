const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Middleweares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const sendemailRoute = require('./routes/newsletters');
const setting = require('./routes/setting');

// apply body parser to the data return by requests
app.use('/', sendemailRoute);
app.use('/', setting);


// BOOT THE SERVER
app.listen(3000);


