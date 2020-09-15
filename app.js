const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc');
const router = express.Router();
require('dotenv').config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;

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

const corsOption = {
    origin: hostname,
    credentials: true
};

//Middleweares
app.use(cors(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', router);

app.get('/', (req, res) => res.send('Successful connection with the api!'));

// Import Routes
const newslettersRoute = require('./routes/newsletters');
const settingRoute = require('./routes/setting');
const diagnosticRoute = require('./routes/diagnostic');
const userRoute = require('./routes/users');
const tagRoute = require('./routes/tags');
const userTagRoute = require('./routes/userTag');
const publicationRoute = require('./routes/publications');
const commentRoute = require('./routes/comment');
const likeUserRoute = require('./routes/likeUser');

// apply body parser to the data return by requests
app.use('/newsletters', newslettersRoute);
app.use('/setting', settingRoute);
app.use('/diagnostic', diagnosticRoute);
app.use('/', userRoute);
app.use('/', tagRoute);
app.use('/', userTagRoute);
app.use('/', publicationRoute);
app.use('/', commentRoute);
app.use('/', likeUserRoute);

// BOOT THE SERVER
app.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}/`);
});
