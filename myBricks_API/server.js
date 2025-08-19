const express = require('express');
const DBConnect = require('./utils/db.js');
const swaggerUi = require('swagger-ui-express');
const requestLogger = require('./middleware/logger.js');
const errorHandler = require('./middleware/errorHandler.js');
const routes = require('./routes/index.js');
require('dotenv').config();
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

const server = express();
server.use(express.json());
server.use(requestLogger);
server.use('/', routes);
server.use(errorHandler);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

DBConnect();

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})