const WishModel = require("../models/WishModel");
const mongoose = require("mongoose");


const WishListServices = async (req) => { 
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let matchStage = { $match: { userID: user_id } }

        let JoinStageProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "products" } }
        let UnwindProductStage = { $unwind: "$products" }
       
      let JoinStageBrand = { $lookup: { from: "brands", localField: "products.brandId", foreignField: "_id", as: "brands" } }
      let UnwindBrandStage = { $unwind: "$brands" }
       
        
        
        let JoinStageCategory = { $lookup: { from: "categories", localField: "products.categoryId", foreignField: "_id", as: "categories" } }
        let UnwindCategoryStage = { $unwind: "$categories" }
        
        
        let ProjectionStage = {$project: { '_id': 0, 'createdAt': 0, 'updatedAt': 0,'products.categoryId': 0, 'products.brandId': 0,'products.createdAt': 0,'products.updatedAt': 0,'brands._id': 0,'categories._id': 0,}};
       
        let data = await WishModel.aggregate([
            matchStage,
            JoinStageProduct,
            UnwindProductStage,
             JoinStageBrand,
             UnwindBrandStage,
             JoinStageCategory,
            UnwindCategoryStage,
            ProjectionStage
       
        ])
          return { status: "success", data: data };
    }
    catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
     }


}



const CreateWishListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;


        await WishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true })

        return { status: "success", message: "Product Added To Your wishlist" }
    }

    catch (e) { 
        return { status: "fail", message: "Something Went Wrong" }
    }

 

}




const RemoveWishListService = async (req) => {
    
  try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;


        await WishModel.deleteOne(reqBody)

        return { status: "success", message: "Product Removed From Your wishlist" }
    }

    catch (e) { 
        return { status: "fail", message: "Something Went Wrong" }
    }

 

}


// const SaveWishListServices = async (req) => { 
//     try {
//         let user_id = req.headers.user_id;
//         let reqBody = req.body;
//         reqBody.userID = user_id;
//         await WishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true })
//         return {status:"success",message:"Wish List Save Successfully"}
//     } catch (error) {
//         return {status:"fail",message:"Something Went Wrong"}
        
//     }
// }






module.exports = {
  //  SaveWishListServices,
    WishListServices,
    CreateWishListService,
    RemoveWishListService
}