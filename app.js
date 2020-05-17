const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc');
const router = express.Router();


//swagger

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API CRINK",
            description: "This is the API Documentation of the mobile application Crink, created by CRINK© company",
            version: "1.0.0",

            termsOfService: "http://swagger.io/terms/",
            contact: {
                name: "Crink support",
                email: "contact@crink.fr"
            },
            servers: ["http://localhost:3000"]
        },
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


//Middleweares
app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', router);

// Import Routes
const sendemailRoute = require('./routes/newsletters');
const setting = require('./routes/setting');

// apply body parser to the data return by requests
app.use('/', sendemailRoute);
app.use('/', setting);


// BOOT THE SERVER
app.listen(3000);


