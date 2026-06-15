const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const ProductModel = require('../models/ProductModel');
const ProductSliderModel = require('../models/ProductSliderModel');
const ProductReviewModel = require('../models/ReviewModel');
const ProductDetailsModel = require('../models/ProductDetailsModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//  SERVICES
const ProductBrandListService = async () => { 
    try {
        let data = await BrandModel.find();
        return {status: "success", data: data};
    } catch (error) {
        return { status: "error", data: error.message }.toString(); 
    }
}

const CategoryListService = async () => { 
    try {
        let data = await CategoryModel.find();
        return {status: "success", data: data};
    } catch (error) {
        return { status: "error", data: error.message }.toString(); 
    }
}

const SliderListService = async () => { 
    try {
        let data = await ProductSliderModel.find().populate('productID');
        return {status:"success", data:data}
    } catch (error) {
        return { status: "error", data: error.message }.toString(); 
    }
}

const ListByBrandService = async (req) => {
    try {
        let BrandID = new ObjectId(req.params.BrandID);
        
        

        let MatchStage = { $match: { brandId: BrandID } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: {'brand.id': 0, 'category.id': 0, 'categoryId': 0 ,'brandId': 0, } }
       
       
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            ProjectionStage
        ]);

        
        
        return { status: "success", data: data };
    } catch (error) {
       
         return { status: "error", data: error.message }.toString(); 
    }
}

const ListByCategoryService = async (req) => {
    
    try {
        let CategoryID = new ObjectId(req.params.CategoryID);
        
        

        let MatchStage = { $match: { categoryId: CategoryID } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: {'brand.id': 0, 'category.id': 0, 'categoryId': 0 ,'brandId': 0, } }
       
       
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            ProjectionStage
        ]);

        
        
        return { status: "success", data: data };
    } catch (error) {
       
         return { status: "error", data: error.message }.toString(); 
    }
}


const ListBySimilarService = async (req) => {
     try {
        let CategoryID = new ObjectId(req.params.CategoryID);
        
        

        let MatchStage = { $match: { categoryId: CategoryID } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: {'brand.id': 0, 'category.id': 0, 'categoryId': 0 ,'brandId': 0, } }
         let LimitStage = {$limit : 15}
       
        let data = await ProductModel.aggregate([
            MatchStage,LimitStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            ProjectionStage
        ]);

        
        
        return { status: "success", data: data };
    } catch (error) {
       
        return { status: "error", data: error.message };
    }
}
 
const ListByKeywordService = async (req) => {
     try {
        let SearchRegex = { "$regex": req.params.Keyword, "$options": "i" };
    
        let SearchParams = [{ title: SearchRegex }, { shortDescription: SearchRegex }];
        let SearchStage = { $or: SearchParams };

        let MatchStage = { $match: SearchStage }; 

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { 'brand.id': 0, 'category.id': 0, 'categoryId': 0, 'brandId': 0 } };
       
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: "success", data: data };

    } catch (e) { 
        return { status: "fail", data: e }.toString();
    }
}
 
const ListByRemarkService = async (req) => {
    try {
        let Remark = req.params.Remark;

        let MatchStage = { $match: { remark: Remark } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { 'brand.id': 0, 'category.id': 0, 'categoryId': 0, 'brandId': 0 } };

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: "success", data: data };
    } catch (error) {
        return { status: "fail", data: error.message }; 
    }
}


 
const DetailsService = async (req) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage = { $match: { _id: ProductID } };
        
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let JointWithDetailsStage = { $lookup: { from: "productdetails", localField: "_id", foreignField: "productID", as: "details" } };
        
        let UnwindDetailsStage = { $unwind: { path: "$details", preserveNullAndEmptyArrays: true } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { 'brand.id': 0, 'category.id': 0, 'categoryId': 0, 'brandId': 0 } };
        
        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JointWithDetailsStage,   
            UnwindDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage             
        ]);
        return { status: "success", data: data };
    } catch (error) {
        return { status: "fail", data: error.message }; 
    }
}


const ReviewListService = async (req) => {
    try {
       let ProductID = new ObjectId(req.params.ProductID);
      let MatchStage = { $match: { productID: ProductID } }; 

       let JoinWithProfileStage = { $lookup: { from: "profiles", localField: "userID", foreignField: "userID", as: "profile" } };
      let UnwindProfileStage = { 
    $unwind: { 
        path: "$profile", 
        preserveNullAndEmptyArrays: true 
    } 
};
       let ProjectionStage = {
           $project: { 'description': 1, 'rating': 1, 'profile.cus_name': 1 }
       };

       let data = await ProductReviewModel.aggregate([
           MatchStage,
           JoinWithProfileStage,
           UnwindProfileStage,
           ProjectionStage
       ]);

       return { status: "success", data: data };

    } catch (e) {
        return { status: "fail", data: e.toString() };
    }
}


const CreateReviewService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;

        let data = await ProductReviewModel.create({
            productID: new ObjectId(reqBody['productID']),
            userID: user_id,
            description: reqBody['description'],
            rating: reqBody['rating']
        });

        return { status: "success", data: data };

    } catch (e) {
        return { status: "fail", data: e.toString() };
    }
};

const ProductListByFilterService = async (req) => {
    try {
        let matchCondition = {};

        if (req.body['categoryId']) {
            matchCondition.categoryId = new ObjectId(req.body['categoryId']);
        }
        if (req.body['brandId']) {
            matchCondition.brandId = new ObjectId(req.body['brandId']);
        }

        let MatchStage = { $match: matchCondition };
        let AddFieldsStage = {
            $addFields: { numericprice: { $toInt: "$price" } }
        };

        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);

        let PriceMatchConditions = {};

        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericprice'] = {
                ...(PriceMatchConditions['numericprice'] || {}),
                $lte: priceMax  
            };
        }

        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericprice'] = {
                ...(PriceMatchConditions['numericprice'] || {}),
                $gte: priceMin  
            };
        }
 
        let PriceMatchStage = { $match: PriceMatchConditions };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryId': 0, 'brandId': 0 } };

        let data = await ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,   
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: "success", data: data };

    } catch (e) {
        return { status: "fail", data: e.toString() };
    }
}


module.exports = {
    ProductBrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilarService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    CreateReviewService,
    ProductListByFilterService
};