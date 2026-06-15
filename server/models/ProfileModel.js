const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
   
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, },
    cus_add: { type: String, required: true },
    cus_city: { type: String, required: true },
    cus_country: { type: String, required: true },
    cus_phone: { type: String, required: true },
    cus_name: { type: String, required: true },
    cus_postcode:{type:String},
    cus_fax: { type: String },
    cus_state: { type: String, required: true },
    shipping_address: { type: String, required: true },
    shipping_city: { type: String, required: true },
    shipping_country: { type: String, required: true },
    shipping_name: { type: String, required: true },
    shipping_phone: { type: String, required: true },
    shipping_postalcode: { type: String, required: true },
    shipping_state: { type: String, required: true },



},
    {
       timestamps: true ,versionKey: false
    }
)
const ProfileModel = mongoose.model('profiles', DataSchema);
module.exports = ProfileModel;