const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    collection: [{
        setNum: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        addedAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', userSchema);