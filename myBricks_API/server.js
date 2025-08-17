const express = require('express');
const DBConnect = require('./utils/db.js');
const requestLogger = require('./middleware/logger.js');
const errorHandler = require('./middleware/errorHandler.js');
const routes = require('./routes/index.js');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(requestLogger);
server.use('/', routes);
server.use(errorHandler);

DBConnect();

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})