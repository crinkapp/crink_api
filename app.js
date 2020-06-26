const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc');
const router = express.Router();
require('dotenv').config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

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
            servers: [hostname + ':' + port]
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

app.get('/', (req, res) => res.send('Successful connection with the api!'));

// Import Routes
const newslettersRoute = require('./routes/newsletters');
const settingRoute = require('./routes/setting');
const userRoute = require('./routes/users');

// apply body parser to the data return by requests
app.use('/newsletters', newslettersRoute);
app.use('/setting', settingRoute);
app.use('/', userRoute);

// BOOT THE SERVER
app.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}/`);
});