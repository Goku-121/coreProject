import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { unauthorized } from "../utility/utility";
import toast from "react-hot-toast";

const WishStore = create(
  persist(
    (set) => ({
      isWishSubmit: false,
      WishSaveRequest: async (productID) => {
        try {
          set({ isWishSubmit: true });
          let res = await axios.post(`/api/v1/CreateWishList`, {
            productID: productID,
          });
          if (res.data["status"] === "success") {
            toast.success("Added to Wishlist!", {
              style: {
                background: "#1e1e1e",
                color: "#fff",
                border: "1px solid #28a745",
              },
              iconTheme: { primary: "#28a745", secondary: "#fff" },
            });
            return true;
          } else {
            toast.error("Already in Wishlist!", {
              style: {
                background: "#1e1e1e",
                color: "#fff",
                border: "1px solid #dc3545",
              },
              iconTheme: { primary: "#dc3545", secondary: "#fff" },
            });
            return false;
          }
        } catch (e) {
          toast.error("Failed to add to Wishlist!", {
            style: {
              background: "#1e1e1e",
              color: "#fff",
              border: "1px solid #dc3545",
            },
          });
          if (e.response) unauthorized(e.response.status);
        } finally {
          set({ isWishSubmit: false });
        }
      },

      WishList: null,
      WishCount: 0,
      WishListRequest: async () => {
        try {
          let res = await axios.get(`/api/v1/WishListServices`);
          set({ WishList: res.data["data"] });
          set({ WishCount: res.data["data"].length });
        } catch (e) {
          set({ WishList: [] });
          if (e.response) unauthorized(e.response.status);
        }
      },

      RemoveWishListRequest: async (productID) => {
        try {
          set((state) => ({
            WishList: state.WishList?.filter(
              (item) => item.productID !== productID
            ),
            WishCount: state.WishCount > 0 ? state.WishCount - 1 : 0,
          }));
          await axios.post(`/api/v1/RemoveWishList`, { productID: productID });
          toast.success("Removed from Wishlist!", {
            style: {
              background: "#1e1e1e",
              color: "#fff",
              border: "1px solid #28a745",
            },
            iconTheme: { primary: "#28a745", secondary: "#fff" },
          });
        } catch (e) {
          toast.error("Failed to remove!", {
            style: {
              background: "#1e1e1e",
              color: "#fff",
              border: "1px solid #dc3545",
            },
          });
          if (e.response) unauthorized(e.response.status);
        }
      },
    }),
    {
      name: "wish-store",
      partialize: (state) => ({
        WishList: state.WishList,
        WishCount: state.WishCount,
      }),
    }
  )
);

export default WishStore;