const CartModel = require('../models/CartModel');
const mongoose = require('mongoose');

const CartListService = async (req) => {
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);

        let matchStage = { $match: { userID: user_id } };

        let JoinStageProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "products" } };
        let UnwindProductStage = { $unwind: "$products" };

        let JoinStageBrand = { $lookup: { from: "brands", localField: "products.brandId", foreignField: "_id", as: "brands" } };
        let UnwindBrandStage = { $unwind: "$brands" };

        let JoinStageCategory = { $lookup: { from: "categories", localField: "products.categoryId", foreignField: "_id", as: "categories" } };
        let UnwindCategoryStage = { $unwind: "$categories" };

        let ProjectionStage = {
            $project: {
                '_id': 1,
                'userID': 1,
                'qty': 1,
                'size': 1,
                'color': 1,
                'product': '$products',
                'brand': '$brands',
                'category': '$categories'
            }
        };

        let data = await CartModel.aggregate([
            matchStage,
            JoinStageProduct,
            UnwindProductStage,
            JoinStageBrand,
            UnwindBrandStage,
            JoinStageCategory,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: "success", data: data };

    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

const SaveCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;

        await CartModel.create(reqBody);

        return { status: "success", message: "Cart Created Successfully" };

    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

const UpdateCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let cartID = req.params.cartID;
        let reqBody = req.body;

        await CartModel.updateOne({ _id: cartID, userID: user_id }, { $set: reqBody });

        return { status: "success", message: "Cart Updated Successfully" };

    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

const RemoveCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let cartID = req.params.cartID;

        await CartModel.deleteOne({ _id: cartID, userID: user_id });

        return { status: "success", message: "Product Removed From Your Cart List" };

    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" };
    }
};

module.exports = {
    CartListService,
    SaveCartListService,
    UpdateCartListService,
    RemoveCartListService
};