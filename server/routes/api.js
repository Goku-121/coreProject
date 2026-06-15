const express = require('express');
const router = express.Router();

const ProductController = require('../controller/ProductController');
const UserController = require('../controller/UserController');
const AuthVerification = require('../middlewares/AuthVerification');
const WishListController = require('../controller/WishListController');
const CartListController = require('../controller/CartlListController');
const InvoiceController = require('../controller/InvoiceController');
const FeaturesController = require('../controller/FeaturesController');
const AdminController = require('../controller/AdminController');
const AdminVerification = require('../middlewares/AdminVerification');
const upload = require('../middlewares/Upload');

// Product
router.get('/ProductBrandList', ProductController.ProductBrandList);
router.get('/ProductCategoryList', ProductController.ProductCategoryList);
router.get('/ProductSliderList', ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory);
router.get('/ProductListBySimilar/:CategoryID', ProductController.ProductListBySimilar);
router.get('/ProductByKeyword/:Keyword', ProductController.ProductByKeyword);
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails);
router.get('/ProductReviewList/:ProductID', ProductController.ProductReviewList);
router.post('/ProductListByFilter', ProductController.ProductListByFilter);

// Users - Auth
router.post('/Register', UserController.RegisterUser);         // NEW: direct register no OTP
router.post('/LoginWithPassword', UserController.LoginWithPassword);
router.get('/UserLogout', AuthVerification, UserController.UserLogout);

// Profile
router.post('/CreateProfile', AuthVerification, UserController.CreateProfile);
router.post('/UpdateProfile', AuthVerification, UserController.UpdateProfile);
router.get('/ReadProfile', AuthVerification, UserController.ReadProfile);

// WishList
router.get('/WishListServices', AuthVerification, WishListController.WishListServices);
router.post('/CreateWishList', AuthVerification, WishListController.CreateWishListService);
router.post('/RemoveWishList', AuthVerification, WishListController.RemoveWishListService);

// Cart
router.get('/CartListService', AuthVerification, CartListController.CartListServices);
router.post('/SaveCartListService', AuthVerification, CartListController.SaveCartListService);
router.post('/UpdateCartListService/:cartID', AuthVerification, CartListController.UpdateCartListService);
router.delete('/RemoveCartListService/:cartID', AuthVerification, CartListController.RemoveCartListService);

// Invoice & Payment
router.get('/CreateInvoiceService', AuthVerification, InvoiceController.CreateInvoiceService);
router.get('/InvoiceListService', AuthVerification, InvoiceController.InvoiceListService);
router.get('/InvoiceProductListService/:invoice_id', AuthVerification, InvoiceController.InvoiceProductListService);

// Payment Callbacks
router.post('/PaymentSuccessInvoiceService/:trxID', InvoiceController.PaymentSuccessInvoiceService);
router.post('/PaymentCancelService/:trxID', InvoiceController.PaymentCancelService);
router.post('/PaymentFailService/:trxID', InvoiceController.PaymentFailService);
router.post('/PaymentIPNInvoiceService/:trxID', InvoiceController.PaymentIPNInvoiceService);

// Features
router.get('/FeaturesList', FeaturesController.FeaturesList);
router.get('/LegalDetails/:type', FeaturesController.LegalDetails);

// Review
router.post('/CreateReview', AuthVerification, ProductController.CreateReview);

// Admin Auth (only login - no register/OTP)
router.post('/AdminLogin', AdminController.AdminLogin);

// Admin Protected
router.get('/AdminProfile', AdminVerification, AdminController.AdminProfile);
router.get('/AdminDashboardStats', AdminVerification, AdminController.AdminDashboardStats);
router.put('/AdminUpdateOrderStatus/:id', AdminVerification, AdminController.AdminOrderStatus);

// Admin User Management
router.get('/AdminUserList', AdminVerification, AdminController.AdminUserList);
router.get('/AdminUserDetails/:id', AdminVerification, AdminController.AdminUserDetails);
router.delete('/AdminDeleteUser/:id', AdminVerification, AdminController.AdminDeleteUser);

// Admin Order Management
router.get('/AdminOrderList', AdminVerification, AdminController.AdminOrderList);
router.get('/AdminOrderDetails/:id', AdminVerification, AdminController.AdminOrderDetails);
router.put('/AdminOrderStatus/:id', AdminVerification, AdminController.AdminOrderStatus);

// Admin Product Management
router.get('/AdminProductList', AdminVerification, AdminController.AdminProductList);
router.get('/AdminProductDetails/:id', AdminVerification, AdminController.AdminProductDetails);
router.post('/AdminCreateProduct', AdminVerification, AdminController.AdminCreateProduct);
router.put('/AdminUpdateProduct/:id', AdminVerification, AdminController.AdminUpdateProduct);
router.delete('/AdminDeleteProduct/:id', AdminVerification, AdminController.AdminDeleteProduct);

// Image Upload & Product Details
router.post('/UploadImage', AdminVerification, upload.single('image'), AdminController.UploadImage);
router.post('/AdminCreateProductDetails', AdminVerification, AdminController.AdminCreateProductDetails);

module.exports = router;
