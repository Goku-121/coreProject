const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number, required: true },
    img: { type: String, required: true },

    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }

},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('productsliders', DataSchema);