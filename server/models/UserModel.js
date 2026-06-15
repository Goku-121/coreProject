const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    otp: { type: String, default: "0" },
    password: { type: String, default: null },
    is_verified: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('users', DataSchema);