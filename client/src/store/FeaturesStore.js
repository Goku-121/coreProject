import { create } from "zustand";
import axios from "axios";


const FeaturesStore = create((set) => ({
    FeaturesList: null,

    FeaturesListRequest: async () => {
        let res = await axios.get(`/api/v1/FeaturesList`);
        if (res.data['status'] === "success") {
            set({ FeaturesList: res.data['data'] });
        }
    },

   
    LegalDetails: null,
       
    LegalDetailsRequest: async (type) => {
       set({LegalDetails:null});
       
        let res = await axios.get(`/api/v1/LegalDetails/${type}`);

        if (res.data['status'] === "success") {
            set({ LegalDetails: res.data['data'] });
        }
    },
}));

export default FeaturesStore;