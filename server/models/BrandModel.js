const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    model: { type: String, required: true },
    specifications: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('brands', BrandSchema);