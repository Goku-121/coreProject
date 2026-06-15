import { create } from "zustand";
import axios from "../utility/axiosConfig";
import Cookies from "js-cookie";

const UserStore = create((set) => ({
   isLogin: !!Cookies.get('token') || !!localStorage.getItem('token'),
    getUserEmail: () => Cookies.get('userEmail') || "",
    isFormSubmit: false,

    // Register Form
    RegisterFormData: { email: "", password: "", confirm_password: "" },
    RegisterFormOnChange: (name, value) => {
        set((state) => ({
            RegisterFormData: { ...state.RegisterFormData, [name]: value }
        }));
    },

    // Direct Register (no OTP)
    RegisterRequest: async (email, password) => {
        set({ isFormSubmit: true });
        try {
            let res = await axios.post(`/api/v1/Register`, { email, password });
            set({ isFormSubmit: false });
            return res.data['status'] === "success";
        } catch {
            set({ isFormSubmit: false });
            return false;
        }
    },

    // Login Form
    PasswordLoginFormData: { email: "", password: "" },
    PasswordLoginFormOnChange: (name, value) => {
        set((state) => ({
            PasswordLoginFormData: { ...state.PasswordLoginFormData, [name]: value }
        }));
    },

  LoginWithPasswordRequest: async (email, password) => {
    set({ isFormSubmit: true });
    try {
        let res = await axios.post(`/api/v1/LoginWithPassword`, { email, password });
        if (res.data['status'] === "success") {
            Cookies.set('userEmail', email);
            
            localStorage.setItem('token', res.data.token);
            Cookies.set('token', res.data.token);
        }
        set({ isFormSubmit: false });
        return res.data;
    } catch {
        set({ isFormSubmit: false });
        return { status: "fail" };
    }
},

    UserLogoutRequest: async () => {
        set({ isFormSubmit: true });
        try {
            await axios.get(`/api/v1/UserLogout`);
        } catch (e) {
            console.error("Error occurred while logging out:", e);
        }
        Cookies.remove('token');
        Cookies.remove('userEmail');
        Cookies.remove('adminToken');
        localStorage.removeItem('adminInfo');
        set({ isFormSubmit: false });
        return true;
    },

    // Profile
    ProfileForm: {
        cus_name: "", cus_add: "", cus_city: "", cus_country: "",
        cus_phone: "", cus_state: "", cus_fax: "", cus_postcode: "",
        shipping_name: "", shipping_address: "", shipping_city: "",
        shipping_country: "", shipping_phone: "", shipping_postalcode: "", shipping_state: "",
    },
    ProfileLoading: false,
    ProfileFormChange: (name, value) => {
        set((state) => ({ ProfileForm: { ...state.ProfileForm, [name]: value } }));
    },
    ProfileDetails: null,

    ProfileDetailsRequest: async () => {
        set({ ProfileLoading: true });
        try {
            let res = await axios.get(`/api/v1/ReadProfile`);
            if (res.data["data"].length > 0) {
                let data = res.data["data"][0];
                set({ ProfileDetails: data, ProfileForm: data, ProfileLoading: false });
            } else {
                set({ ProfileDetails: {}, ProfileLoading: false });
            }
        } catch (e) {
            set({ ProfileLoading: false });
            if (e.response && e.response.status === 401) {
                Cookies.remove("token");
                Cookies.remove("userEmail");
                window.location.href = "/login";
            }
        }
    },

    ProfileSaveRequest: async (PostBody) => {
        try {
            set({ ProfileLoading: true });
            let res = await axios.post(`/api/v1/CreateProfile`, PostBody, { withCredentials: true });
            set({ ProfileLoading: false });
            return res.data["status"] === "success";
        } catch (e) {
            set({ ProfileLoading: false });
            if (e.response && e.response.status === 401) {
                Cookies.remove("token");
                Cookies.remove("userEmail");
                window.location.href = "/login";
            }
            return false;
        }
    },
}));

export default UserStore;
