const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('wishes', DataSchema);