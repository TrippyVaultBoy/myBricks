const mongoose = require('mongoose');

const legoSetSchema = new mongoose.Schema({
    setNum: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    themeId: { type: Number, required: true },
    year: { type: Number, required: true },
    numParts: { type: Number, required: true },
    setImgUrl: { type: String, required: true },
    lastFetched: { type: Date, default: Date.now }
}, { collection: 'cachedSets' });

module.exports = mongoose.model('LegoSet', legoSetSchema);