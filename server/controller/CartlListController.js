


const { SaveCartListService, CartListService, UpdateCartListService, RemoveCartListService } = require("../services/CartListServices")


exports.CartListServices = async (req, res) =>
{ 
    let result = await CartListService(req);
    return res.status(200).json(result)

}

exports.SaveCartListService = async (req, res) => { 
     let result = await SaveCartListService(req);
    return res.status(200).json(result)

}
exports.UpdateCartListService = async (req, res) => { 
     let result = await UpdateCartListService(req);
    return res.status(200).json(result)

}
exports.RemoveCartListService = async (req, res) => { 
     let result = await RemoveCartListService(req);
    return res.status(200).json(result)

}
