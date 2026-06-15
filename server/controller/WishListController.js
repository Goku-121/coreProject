const { WishListServices, CreateWishListService, RemoveWishListService  } = require("../services/WishListServices");//,SaveWishListServices


exports.WishListServices = async (req, res) =>
{ 
    let result = await WishListServices(req);
    return res.status(200).json(result)

}

exports.CreateWishListService = async (req, res) => { 
     let result = await CreateWishListService(req);
    return res.status(200).json(result)

}
exports.RemoveWishListService = async (req, res) => { 
     let result = await RemoveWishListService(req);
    return res.status(200).json(result)

}
// exports.SaveWishListServices = async (req, res) => { 
//      let result = await SaveWishListServices(req);
//     return res.status(200).json(result)

// }
