const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Boolean, default: false },
    discountPrice: { type: Number },
    image: { type: String, required: true },
    star: { type: Number, default: 0 },
    stock: { type: Boolean, default: true },
    remark: { type: String },

   brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'brands', required: true },
   categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('products', DataSchema);