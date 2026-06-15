import React, { useEffect } from 'react'
import UserStore from "../../store/UserStroe";
import { toast } from "react-hot-toast";

const ProfileForm = () => {

    let {
        ProfileForm,
        ProfileFormChange,
        ProfileDetailsRequest,
        ProfileSaveRequest,
        ProfileLoading
    } = UserStore();

    useEffect(() => {
        (async () => {
            await ProfileDetailsRequest();
        })();
    }, []);

    const Save = async () => {
        let res = await ProfileSaveRequest(ProfileForm);

        if (res) {
            toast.success("Profile Saved Successfully");
            await ProfileDetailsRequest();  // Refresh
        } else {
            toast.error("Failed to save profile");
        }
    }

    if (ProfileLoading) {
        return <div className="container mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card p-5 rounded-3 shadow-sm">

                <h5 className="mb-4">Customer Details</h5>
                <hr className="mb-4" />

                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <label className="form-label">Customer Name</label>
                        <input value={ProfileForm.cus_name || ""} onChange={(e) => ProfileFormChange("cus_name", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Customer Phone</label>
                        <input value={ProfileForm.cus_phone || ""} onChange={(e) => ProfileFormChange("cus_phone", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Customer Fax</label>
                        <input value={ProfileForm.cus_fax || ""} onChange={(e) => ProfileFormChange("cus_fax", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Customer Country</label>
                        <input value={ProfileForm.cus_country || ""} onChange={(e) => ProfileFormChange("cus_country", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Customer City</label>
                        <input value={ProfileForm.cus_city || ""} onChange={(e) => ProfileFormChange("cus_city", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Customer State</label>
                        <input value={ProfileForm.cus_state || ""} onChange={(e) => ProfileFormChange("cus_state", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Customer Address</label>
                        <input value={ProfileForm.cus_add || ""} onChange={(e) => ProfileFormChange("cus_add", e.target.value)} className="form-control" />
                    </div>
                </div>

                <h5 className="mb-4">Shipping Details</h5>
                <hr className="mb-4" />

                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <label className="form-label">Shipping Name</label>
                        <input value={ProfileForm.shipping_name || ""} onChange={(e) => ProfileFormChange("shipping_name", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Shipping Phone</label>
                        <input value={ProfileForm.shipping_phone || ""} onChange={(e) => ProfileFormChange("shipping_phone", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Shipping Country</label>
                        <input value={ProfileForm.shipping_country || ""} onChange={(e) => ProfileFormChange("shipping_country", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Shipping City</label>
                        <input value={ProfileForm.shipping_city || ""} onChange={(e) => ProfileFormChange("shipping_city", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Shipping State</label>
                        <input value={ProfileForm.shipping_state || ""} onChange={(e) => ProfileFormChange("shipping_state", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Shipping Postal Code</label>
                        <input value={ProfileForm.shipping_postalcode || ""} onChange={(e) => ProfileFormChange("shipping_postalcode", e.target.value)} className="form-control" />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Shipping Address</label>
                        <input value={ProfileForm.shipping_address || ""} onChange={(e) => ProfileFormChange("shipping_address", e.target.value)} className="form-control" />
                    </div>
                </div>

                <div className="mt-4">
                    <button onClick={Save} className="btn btn-success px-4">
                        Save Profile
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfileForm;