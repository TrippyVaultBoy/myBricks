const mongoose = require('mongoose');
const User = require('../models/user.js');

async function DBConnect() {
    const dbUsername = process.env.MONGO_USERNAME;
    const dbPassword = process.env.MONGO_PASSWORD;
    const dbHost = process.env.MONGO_HOST;
    const dbName = process.env.MONGO_NAME;

    const uri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(uri)
        .then(() => {
            console.log(`Connected to MongoDB - database: ${mongoose.connection.name}`);
        });
    } catch (err) {
        next(err);
        process.exit(1);
    }
}

module.exports = DBConnect;
