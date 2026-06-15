import React from "react";
import { useNavigate } from "react-router-dom";
import AdminStore from "../../store/AdminStore";
import ValidationHelper from "../../utility/ValidatonHelper";
import toast from "react-hot-toast";

const AdminRegisterOtpForm = () => {
    const navigate = useNavigate();
    const {
        AdminOtpFormData,
        AdminOtpFormOnChange,
        VerifyAdminRegisterOTPRequest,
        isFormSubmit,
    } = AdminStore();

    const onFormSubmit = async () => {
        if (ValidationHelper.IsEmpty(AdminOtpFormData.otp || "")) {
            toast.error("Please enter the verification code");
            return;
        }

        const res = await VerifyAdminRegisterOTPRequest(AdminOtpFormData.otp);
        if (res) {
            toast.success("Admin registration successful!");
            navigate("/admin/login");
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "#1a1a2e" }}
        >
            <div className="card p-5 shadow" style={{ width: "450px" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-envelope-check-fill fs-1 text-dark"></i>
                    <h3 className="fw-bold mt-2">Verify Admin Email</h3>
                    <p className="text-muted small">
                        Enter the 6-digit code sent to your email to complete registration.
                    </p>
                </div>

                <label className="form-label fw-semibold">Verification Code</label>
                <input
                    className="form-control mb-4"
                    placeholder="Enter 6-digit verification code"
                    type="text"
                    maxLength={6}
                    value={AdminOtpFormData.otp || ""}
                    onChange={(e) => AdminOtpFormOnChange("otp", e.target.value)}
                />

                <button
                    className="btn btn-dark w-100 py-2"
                    onClick={onFormSubmit}
                    disabled={isFormSubmit}
                >
                    {isFormSubmit ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Verifying...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-patch-check me-2"></i>Verify & Complete Registration
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AdminRegisterOtpForm;