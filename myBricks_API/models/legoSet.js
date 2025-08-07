const mongoose = require('mongoose');

const legoSetSchema = new mongoose.Schema({
    setNum: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    year: { type: Number, required: true },
    theme: { type: String, required: true },
    pieces: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    lastFetched: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('LegoSet', legoSetSchema);