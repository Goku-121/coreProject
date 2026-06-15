const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    invoiceID: { type: mongoose.Schema.Types.ObjectId, ref: 'invoices', required: true },

    qty: { type: Number, required: true },
    price: { type: Number, required: true },

    color: String,
    size: String

},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('invoice_products', DataSchema);