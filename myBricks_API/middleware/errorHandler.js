const fs = require('fs');
const path = require('path');
const errorFile = path.join(__dirname, "../logs/errors.log")

function errorHandler(err, req, res, next) {
    errorLog = `[${new Date().toISOString()}] ERROR: ${err.message}\n${err.stack}\n\n`;

    fs.appendFile(errorFile, errorLog, (fsErr) => {
        if (fsErr) console.error("Failed to write log: ", fsErr);
    });

    res.status(err.status || 500).json({
        error: 'Something went wrong.'
    });
}

module.exports = errorHandler;