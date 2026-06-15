import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminStore from "../../store/AdminStore";
import toast from "react-hot-toast";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { AdminLoginFormData, AdminLoginFormOnChange, AdminLoginRequest, isFormSubmit } = AdminStore();

    const onFormSubmit = async () => {
        if (!AdminLoginFormData.email) { toast.error("Email is required"); return; }
        if (!AdminLoginFormData.password) { toast.error("Password is required"); return; }

        let res = await AdminLoginRequest(AdminLoginFormData.email, AdminLoginFormData.password);
        if (res) {
            toast.success("Welcome, Admin!");
            navigate("/admin/dashboard");
        } else {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#1a1a2e" }}>
            <div className="card p-5 shadow" style={{ width: "450px" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-shield-lock-fill fs-1 text-dark"></i>
                    <h3 className="fw-bold mt-2">Admin Login</h3>
                    <p className="text-muted small">CoreVault Admin Panel</p>
                </div>

                <label className="form-label fw-semibold">Email</label>
                <input
                    className="form-control mb-3"
                    placeholder="Admin email"
                    type="email"
                    value={AdminLoginFormData.email || ""}
                    onChange={(e) => AdminLoginFormOnChange("email", e.target.value)}
                />

                <label className="form-label fw-semibold">Password</label>
                <div className="input-group mb-4">
                    <input
                        className="form-control"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={AdminLoginFormData.password || ""}
                        onChange={(e) => AdminLoginFormOnChange("password", e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                </div>

                <button className="btn btn-dark w-100 py-2" onClick={onFormSubmit} disabled={isFormSubmit}>
                    {isFormSubmit ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</>
                    ) : (
                        <><i className="bi bi-box-arrow-in-right me-2"></i>Login</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
