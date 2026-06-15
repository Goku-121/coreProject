import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home-page";
import ProductByBrand from "./pages/product-by-brand";
import ProductByCategory from "./pages/product-by-category";
import ProductByKeyword from "./pages/product-by-keyword";
import ProductByDetails from "./pages/product-by-details";
import AboutPage from "./pages/about-page";
import RefundPage from "./pages/refund-page";
import TermsPage from "./pages/terms-page";
import PrivacyPage from "./pages/privacy-page";
import HowToBuyPage from "./pages/how-to-buy-page";
import ContactPage from "./pages/contact-page";
import ComplaintPage from "./pages/complaint-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ProfilePage from "./pages/profile-page";
import CartPage from "./pages/cart-list";
import WishPage from "./pages/wish-page";
import OrderPage from "./pages/order-page";
import InvoicePage from "./pages/invoice-page";

// Admin Pages
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminProducts from "./pages/admin/admin-products";
import AdminOrders from "./pages/admin/admin-orders";
import AdminUsers from "./pages/admin/admin-users";
import AdminLogin from "./pages/admin/admin-login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<ProductByDetails />} />
        <Route path="/product/:id" element={<ProductByDetails />} />
        <Route path="/by-brand/:id" element={<ProductByBrand />} />
        <Route path="/by-category/:id" element={<ProductByCategory />} />
        <Route path="/by-keyword/:keyword" element={<ProductByKeyword />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/howtobuy" element={<HowToBuyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/invoice/:id" element={<InvoicePage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Catch old OTP/register routes and redirect */}
        <Route path="/otp" element={<Navigate to="/login" replace />} />
        <Route path="/register-otp" element={<Navigate to="/register" replace />} />
        <Route path="/admin/register" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/register/verify" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
