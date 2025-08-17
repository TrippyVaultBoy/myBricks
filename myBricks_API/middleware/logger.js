const { log } = require('console');
const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '../logs/requests.log');

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} Status: ${res.statusCode} - ${duration}ms\n`;

    console.log(log.trim());

    fs.appendFile(logFile, log, (err) => {
      if (err) console.error("Failed to write log:", err);
    });
  });

  next();
}

module.exports = requestLogger;