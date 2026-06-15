const mongoose = require('mongoose');

const LegalSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      enum: ['terms', 'privacy', 'about', 'refund', 'howtobuy', 'contact', 'complaint']
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const LegalModel = mongoose.model('legal', LegalSchema, 'legal');

module.exports = LegalModel;