const express = require('express');
const routes = require('./routes/index.js');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use('/', routes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})