const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MyBricks API",
            version: "1.0.0",
            description: "API documentation for MyBricks LEGO collection app",
        },
        servers: [
            { url: "http://localhost:4000" }
        ],
    },
    apis: ['./routes/index.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;