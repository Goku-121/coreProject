import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../utility/utility.js";

const CartStore = create((set) => ({

    isCartSubmit: false,

    CartForm: {
        productID: "",
        color: "",
        qty: "1",
        size: ""
    },

    CartFormChange: (name, value) =>
        set((state) => ({
            CartForm: {
                ...state.CartForm,
                [name]: value
            }
        })),

    CartSaveRequest: async (PostBody, productID) => {
        try {
            set({ isCartSubmit: true });
            PostBody.productID = productID;
            let res = await axios.post(`/api/v1/SaveCartListService`, PostBody);
            return res.data?.status === "success";
        } catch (e) {
            unauthorized(e?.response?.status);
            return false;
        } finally {
            set({ isCartSubmit: false });
        }
    },

    CartList: null,
    CartCount: 0,
    CartTotal: 0,
    CartVatTotal: 0,
    CartPayableTotal: 0,

    CartListRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/CartListService`);
            let data = res.data?.data || [];

            set({ CartList: data, CartCount: data.length });

            let total = 0;
            data.forEach((item) => {
                if (item?.product?.discount === true) {
                    total += parseInt(item.qty) * parseInt(item.product.discountPrice);
                } else {
                    total += parseInt(item.qty) * parseInt(item.product.price);
                }
            });

            let vat = parseFloat((total * 0.05).toFixed(2));
            let payable = total + vat;

            set({ CartTotal: total, CartVatTotal: vat, CartPayableTotal: payable });

        } catch (e) {
            unauthorized(e?.response?.status);
        }
    },

    RemoveCartListRequest: async (cartID) => {
        try {
            let res = await axios.delete(`/api/v1/RemoveCartListService/${cartID}`);
            return res.data?.status === "success";
        } catch (e) {
            unauthorized(e?.response?.status);
            return false;
        }
    },

    CreateInvoiceRequest: async () => {
        try {
            set({ isCartSubmit: true });
            let res = await axios.get(`/api/v1/CreateInvoiceService`);
            let url = res.data?.data?.GatewayPageURL;
            if (url) {
                window.location.href = url;
                return true;
            }
            return false;
        } catch (e) {
            unauthorized(e?.response?.status);
            return false;
        } finally {
            set({ isCartSubmit: false });
        }
    },

    // Invoice List
    InvoiceList: null,

    InvoiceListRequest: async () => {
        try {
            let res = await axios.get(`/api/v1/InvoiceListService`);
            let data = res.data?.data || [];
            set({ InvoiceList: data });
        } catch (e) {
            unauthorized(e?.response?.status);
            set({ InvoiceList: [] });
        }
    },

    //  Invoice Details
    InvoiceDetails: null,

 InvoiceDetailsRequest: async (invoice_id) => {
    try {
        let user_id = localStorage.getItem('user_id'); 
        let res = await axios.get(`/api/v1/InvoiceProductListService/${invoice_id}`, {
            headers: { user_id: user_id }
        });
        let data = res.data?.data || [];
        set({ InvoiceDetails: data });
    } catch (e) {
        unauthorized(e?.response?.status);
        set({ InvoiceDetails: [] });
    }
},

}));

export default CartStore;