import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminStore from "../../store/AdminStore";
import ValidationHelper from "../../utility/ValidatonHelper";
import toast from "react-hot-toast";

const AdminRegister = () => {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        AdminRegisterFormData,
        AdminRegisterFormOnChange,
        AdminRegisterRequest,
        isFormSubmit,
    } = AdminStore();

    const onFormSubmit = async () => {
        const { name, email, password, adminId, phone } = AdminRegisterFormData;

        if (ValidationHelper.IsEmpty(name || "")) {
            toast.error("Full name is required");
            return;
        }
        if (!ValidationHelper.IsLater(name)) {
            toast.error("Name should contain letters only");
            return;
        }
        if (ValidationHelper.IsEmpty(adminId || "")) {
            toast.error("Admin ID is required");
            return;
        }
        if (ValidationHelper.IsEmpty(email || "")) {
            toast.error("Email is required");
            return;
        }
        if (!ValidationHelper.IsEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (ValidationHelper.IsEmpty(phone || "")) {
            toast.error("Phone number is required");
            return;
        }
        if (!ValidationHelper.IsMobile(phone)) {
            toast.error("Please enter a valid Bangladeshi phone number");
            return;
        }
        if (ValidationHelper.IsEmpty(password || "")) {
            toast.error("Password is required");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (ValidationHelper.IsEmpty(confirmPassword || "")) {
            toast.error("Please confirm your password");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const res = await AdminRegisterRequest(name, email, password, adminId, phone);
        if (res) {
            toast.success("OTP sent to your email!");
            navigate("/admin/register/verify");
        } else {
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center py-5"
            style={{ minHeight: "100vh", background: "#1a1a2e" }}
        >
            <div className="card p-5 shadow" style={{ width: "500px" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-badge-fill fs-1 text-dark"></i>
                    <h3 className="fw-bold mt-2">Admin Register</h3>
                    <p className="text-muted small">Create a new admin account</p>
                </div>

                <label className="form-label fw-semibold">Full Name</label>
                <input
                    className="form-control mb-3"
                    placeholder="Enter your full name"
                    type="text"
                    value={AdminRegisterFormData.name || ""}
                    onChange={(e) => AdminRegisterFormOnChange("name", e.target.value)}
                />

                <label className="form-label fw-semibold">Admin ID</label>
                <input
                    className="form-control mb-3"
                    placeholder="Create a unique Admin ID (e.g. ADM-001)"
                    type="text"
                    value={AdminRegisterFormData.adminId || ""}
                    onChange={(e) => AdminRegisterFormOnChange("adminId", e.target.value)}
                />

                <label className="form-label fw-semibold">Email Address</label>
                <input
                    className="form-control mb-3"
                    placeholder="Enter your email"
                    type="email"
                    value={AdminRegisterFormData.email || ""}
                    onChange={(e) => AdminRegisterFormOnChange("email", e.target.value)}
                />

                <label className="form-label fw-semibold">Phone Number</label>
                <input
                    className="form-control mb-3"
                    placeholder="e.g. 01XXXXXXXXX"
                    type="tel"
                    value={AdminRegisterFormData.phone || ""}
                    onChange={(e) => AdminRegisterFormOnChange("phone", e.target.value)}
                />

                <label className="form-label fw-semibold">Password</label>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        placeholder="Create a password (min 6 characters)"
                        type={showPassword ? "text" : "password"}
                        value={AdminRegisterFormData.password || ""}
                        onChange={(e) => AdminRegisterFormOnChange("password", e.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                </div>

                <label className="form-label fw-semibold">Confirm Password</label>
                <div className="input-group mb-4">
                    <input
                        className="form-control"
                        placeholder="Re-enter your password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                </div>

                <button
                    className="btn btn-dark w-100 py-2"
                    onClick={onFormSubmit}
                    disabled={isFormSubmit}
                >
                    {isFormSubmit ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Creating account...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-person-check me-2"></i>Register
                        </>
                    )}
                </button>

                <div className="text-center mt-3">
                    <Link to="/admin/login" className="small text-muted">
                        Already have an account? <span className="text-dark fw-semibold">Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;