import { create } from "zustand";
import axios from "../utility/axiosConfig";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const handleUnauthorized = (err) => {
    if (err.response?.status === 401) {
        Cookies.remove('adminToken');
        localStorage.removeItem('adminInfo');
        toast.error("Session expired. Please login again.");
        window.location.href = "/admin/login";
    }
};

const AdminStore = create((set) => ({
    isFormSubmit: false,

    // Login
    AdminLoginFormData: { email: "", password: "" },
    AdminLoginFormOnChange: (name, value) => {
        set((state) => ({
            AdminLoginFormData: { ...state.AdminLoginFormData, [name]: value }
        }));
    },
    AdminLoginRequest: async (email, password) => {
        set({ isFormSubmit: true });
        try {
            let res = await axios.post(`/api/v1/AdminLogin`, { email, password });
            if (res.data['status'] === "success") {
                Cookies.set('adminToken', res.data['token']);
                localStorage.setItem('adminInfo', JSON.stringify(res.data['admin']));
                Cookies.remove('token');
                Cookies.remove('userEmail');
                set({ isFormSubmit: false });
                return true;
            } else {
                set({ isFormSubmit: false });
                return false;
            }
        } catch {
            set({ isFormSubmit: false });
            toast.error("Server error. Please try again.");
            return false;
        }
    },

    AdminLogout: () => {
        Cookies.remove('adminToken');
        localStorage.removeItem('adminInfo');
        Cookies.remove('token');
        Cookies.remove('userEmail');
        toast.success("Logged out successfully!");
        window.location.href = "/admin/login";
    },

    isAdminLogin: () => !!Cookies.get('adminToken'),

    getAdminInfo: () => {
        try {
            return JSON.parse(localStorage.getItem('adminInfo')) || null;
        } catch {
            return null;
        }
    },

    // Dashboard
    Summary: null,
    AdminSummaryRequest: async () => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.get(`/api/v1/AdminDashboardStats`, { headers: { token } });
            if (res.data['status'] === "success") {
                set({ Summary: res.data['data'] });
            }
        } catch (err) { handleUnauthorized(err); }
    },

    // Image Upload
    UploadImageRequest: async (file) => {
        try {
            let token = Cookies.get('adminToken');
            const formData = new FormData();
            formData.append('image', file);
            let res = await axios.post(`/api/v1/UploadImage`, formData, {
                headers: { token, 'Content-Type': 'multipart/form-data' }
            });
            if (res.data['status'] === "success") return res.data['url'];
            return null;
        } catch (err) {
            handleUnauthorized(err);
            toast.error("Image upload failed!");
            return null;
        }
    },

    // Products
    ProductList: [],
    AdminProductListRequest: async () => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.get(`/api/v1/AdminProductList`, { headers: { token } });
            if (res.data['status'] === "success") set({ ProductList: res.data['data'] });
        } catch (err) { handleUnauthorized(err); }
    },
    AdminDeleteProductRequest: async (id) => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.delete(`/api/v1/AdminDeleteProduct/${id}`, { headers: { token } });
            if (res.data['status'] === "success") { toast.success("Product deleted!"); return true; }
            return false;
        } catch (err) { handleUnauthorized(err); return false; }
    },
    AdminCreateProductRequest: async (data) => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.post(`/api/v1/AdminCreateProduct`, data, { headers: { token } });
            if (res.data['status'] === "success") { toast.success("Product created!"); return res.data['data'] || res.data; }
            return null;
        } catch (err) { handleUnauthorized(err); return null; }
    },

    // Product Details
    ProductDetails: null,
    AdminProductDetailsRequest: async (productID) => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.get(`/api/v1/AdminProductDetails/${productID}`, { headers: { token } });
            if (res.data['status'] === "success") set({ ProductDetails: res.data['data'] });
        } catch (err) { handleUnauthorized(err); }
    },
    AdminCreateProductDetailsRequest: async (data) => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.post(`/api/v1/AdminCreateProductDetails`, data, { headers: { token } });
            if (res.data['status'] === "success") { toast.success("Product details saved!"); return true; }
            return false;
        } catch (err) { handleUnauthorized(err); return false; }
    },

    // Brands & Categories
    BrandList: [],
    CategoryList: [],
    AdminBrandListRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/ProductBrandList`);
            if (res.data['status'] === "success") set({ BrandList: res.data['data'] });
        } catch {}
    },
    AdminCategoryListRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/ProductCategoryList`);
            if (res.data['status'] === "success") set({ CategoryList: res.data['data'] });
        } catch {}
    },

    // Orders
    OrderList: [],
    AdminOrderListRequest: async () => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.get(`/api/v1/AdminOrderList`, { headers: { token } });
            if (res.data['status'] === "success") set({ OrderList: res.data['data'] });
        } catch (err) { handleUnauthorized(err); }
    },
    AdminUpdateOrderStatusRequest: async (id, status) => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.put(`/api/v1/AdminUpdateOrderStatus/${id}`, { delivery_status: status }, { headers: { token } });
            if (res.data['status'] === "success") { toast.success("Order status updated!"); return true; }
            return false;
        } catch (err) { handleUnauthorized(err); return false; }
    },

    // Users
    UserList: [],
    AdminUserListRequest: async () => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.get(`/api/v1/AdminUserList`, { headers: { token } });
            if (res.data['status'] === "success") set({ UserList: res.data['data'] });
        } catch (err) { handleUnauthorized(err); }
    },
    AdminDeleteUserRequest: async (id) => {
        try {
            let token = Cookies.get('adminToken');
            let res = await axios.delete(`/api/v1/AdminDeleteUser/${id}`, { headers: { token } });
            if (res.data['status'] === "success") { toast.success("User deleted!"); return true; }
            return false;
        } catch (err) { handleUnauthorized(err); return false; }
    },
}));

export default AdminStore;
