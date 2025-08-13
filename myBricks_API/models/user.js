const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    setCollection: [{
        setNum: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        addedAt: { type: Date, default: Date.now },
        name: { type: String, required: true },
        themeId: { type: Number, required: true },
        year: { type: Number, required: true },
        numParts: { type: Number, required: true },
        setImgUrl: { type: String, required: true },
    }]
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);