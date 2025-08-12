const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    setCollection: [{
        setNum: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        addedAt: { type: Date, default: Date.now }
    }]
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);