const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },

    payable: { type: Number, required: true },
    total: { type: Number, required: true },
    vat: { type: Number, required: true },

    cus_details: String,
    shipping_details: String,

    tran_id: String,
    val_id: String,

    delivery_status: { type: String, default: "Pending" },
    payment_status: { type: String, default: "Pending" }

},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('invoices', DataSchema);