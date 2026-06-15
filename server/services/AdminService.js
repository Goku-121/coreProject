const { Encodetoken } = require('../utility/TokenHelper');
const ProductDetailsModel = require('../models/ProductDetailsModel');
const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');
const InvoiceModel = require('../models/InvoiceModel');

// Admin Login - credentials from .env only (hardcoded admin, no DB)
exports.AdminLoginService = async (reqBody) => {
    try {
        let { email, password } = reqBody;
        if (!email || !password) {
            return { status: "fail", message: "Email and password are required" };
        }
        const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "khanshovo67@gmail.com").toLowerCase();
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12369874";

        if (email.toLowerCase() !== ADMIN_EMAIL) {
            return { status: "fail", message: "Admin not found" };
        }
        if (password !== ADMIN_PASSWORD) {
            return { status: "fail", message: "Incorrect password" };
        }
        let token = Encodetoken(ADMIN_EMAIL, "admin");
        return {
            status: "success",
            message: "Login successful",
            token: token,
            admin: { name: "Admin", email: ADMIN_EMAIL }
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Admin Dashboard Stats
exports.AdminDashboardStatsService = async () => {
    try {
        const totalProducts = await ProductModel.countDocuments();
        const totalUsers = await UserModel.countDocuments({ is_verified: true });
        const totalOrders = await InvoiceModel.countDocuments();
        const revenueAgg = await InvoiceModel.aggregate([
            { $match: { payment_status: "Paid" } },
            { $group: { _id: null, total: { $sum: "$total_amount" } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
        return {
            status: "success",
            data: { totalProducts, totalUsers, totalOrders, totalRevenue }
        };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin User List
exports.AdminUserListService = async () => {
    try {
        const users = await UserModel.find({ is_verified: true }).select('-password -otp').sort({ createdAt: -1 });
        return { status: "success", data: users };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin User Details
exports.AdminUserDetailsService = async (id) => {
    try {
        const user = await UserModel.findById(id).select('-password -otp');
        return { status: "success", data: user };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Delete User
exports.AdminDeleteUserService = async (id) => {
    try {
        await UserModel.findByIdAndDelete(id);
        return { status: "success", message: "User deleted" };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Order List
exports.AdminOrderListService = async () => {
    try {
        const InvoiceModel = require('../models/InvoiceModel');
        const orders = await InvoiceModel.find().sort({ createdAt: -1 });
        return { status: "success", data: orders };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Order Details
exports.AdminOrderDetailsService = async (id) => {
    try {
        const InvoiceModel = require('../models/InvoiceModel');
        const order = await InvoiceModel.findById(id);
        return { status: "success", data: order };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Order Status Update
exports.AdminOrderStatusService = async (id, body) => {
    try {
        const InvoiceModel = require('../models/InvoiceModel');
        await InvoiceModel.findByIdAndUpdate(id, { delivery_status: body.delivery_status });
        return { status: "success", message: "Order status updated" };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Product List
exports.AdminProductListService = async () => {
    try {
        const products = await ProductModel.find().sort({ createdAt: -1 });
        return { status: "success", data: products };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Product Details
exports.AdminProductDetailsService = async (id) => {
    try {
        const product = await ProductModel.findById(id);
        return { status: "success", data: product };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Create Product
exports.AdminCreateProductService = async (body) => {
    try {
        const product = await ProductModel.create(body);
        return { status: "success", data: product };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Update Product
exports.AdminUpdateProductService = async (id, body) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(id, body, { new: true });
        return { status: "success", data: product };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Delete Product
exports.AdminDeleteProductService = async (id) => {
    try {
        await ProductModel.findByIdAndDelete(id);
        return { status: "success", message: "Product deleted" };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

// Admin Product Details (extra info)
exports.AdminCreateProductDetailsService = async (body) => {
    try {
        const result = await ProductDetailsModel.findOneAndUpdate(
            { productID: body.productID },
            { $set: body },
            { upsert: true, new: true }
        );
        return { status: "success", data: result };
    } catch (error) {
        return { status: "fail", message: error.message };
    }
};

exports.AdminProfileService = async (email) => {
    return { status: "success", data: { email, name: "Admin" } };
};
