const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    img6: String,
    img7: String,
    img8: String,

    description: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String },

    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }

},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('productdetails', DataSchema);