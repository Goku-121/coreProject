const FeaturesModel = require("../models/FeaturesModel");
const LegalModel = require("../models/LegalModel");
exports.FeaturesListService = async () => { 
    try {
        let data = await FeaturesModel.find();
        return { status: "success", data: data };
    } catch (error) {
        return { status: "error", data: error.toString() }; 
    }
}
exports.LegalDetailsService =async(req)=>{
    try {
        let type = req.params.type;
        let data = await LegalModel.find({ type: type });
        return { status: "success", data: data };
    } catch (error) {
        return { status: "error", data: error.toString() };
    }
}