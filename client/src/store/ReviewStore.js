import { create } from 'zustand';
import axios from "axios";
import { unauthorized } from "../utility/utility.js";

const ReviewStore = create((set) => ({

    isReviewSubmit: false,
    ReviewFormData: { description: "", rating: "5", productID: "" },

    ReviewFormOnChange: (name, value) => {
        set((state) => ({
            ReviewFormData: {
                ...state.ReviewFormData,
                [name]: value
            }
        }))
    },

    ReviewSaveRequest: async (PostBody) => {
        try {
            set({ isReviewSubmit: true });
            let res = await axios.post(`/api/v1/CreateReview`, PostBody);
            return res.data['status'] === "success";
        } catch (e) {
            unauthorized(e?.response?.status);
            return false;
        } finally {
            set({ isReviewSubmit: false });
        }
    },

}));

export default ReviewStore;