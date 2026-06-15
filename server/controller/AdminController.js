const AdminService = require('../services/AdminService');

// Admin Register
exports.AdminRegister = async (req, res) => {
    try {
        let result = await AdminService.AdminRegisterService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Verify OTP
exports.AdminVerifyOTP = async (req, res) => {
    try {
        let result = await AdminService.AdminVerifyOTPService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Login
exports.AdminLogin = async (req, res) => {
    try {
        let result = await AdminService.AdminLoginService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Profile
exports.AdminProfile = async (req, res) => {
    try {
        let email = req.headers['email'];
        let result = await AdminService.AdminProfileService(email);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Dashboard Stats
exports.AdminDashboardStats = async (req, res) => {
    try {
        let result = await AdminService.AdminDashboardStatsService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin User List
exports.AdminUserList = async (req, res) => {
    try {
        let result = await AdminService.AdminUserListService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin User Details
exports.AdminUserDetails = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await AdminService.AdminUserDetailsService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Delete User
exports.AdminDeleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await AdminService.AdminDeleteUserService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Order List
exports.AdminOrderList = async (req, res) => {
    try {
        let result = await AdminService.AdminOrderListService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Order Details
exports.AdminOrderDetails = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await AdminService.AdminOrderDetailsService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Order Status Update
exports.AdminOrderStatus = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await AdminService.AdminOrderStatusService(id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Product List
exports.AdminProductList = async (req, res) => {
    try {
        let result = await AdminService.AdminProductListService();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Product Details
exports.AdminProductDetails = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await AdminService.AdminProductDetailsService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Create Product
exports.AdminCreateProduct = async (req, res) => {
    try {
        let result = await AdminService.AdminCreateProductService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Update Product
exports.AdminUpdateProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await AdminService.AdminUpdateProductService(id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

// Admin Delete Product
exports.AdminDeleteProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await AdminService.AdminDeleteProductService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};
exports.UploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: "fail", message: "No image uploaded" });
        }
        const imageUrl = req.file.path; 
        return res.status(200).json({ status: "success", url: imageUrl });
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};

exports.AdminCreateProductDetails = async (req, res) => {
    try {
        let result = await AdminService.AdminCreateProductDetailsService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
};