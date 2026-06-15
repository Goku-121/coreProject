import React from 'react';
import UserStore from '../../store/UserStroe';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    let navigate = useNavigate();
    let { RegisterFormData, RegisterFormOnChange, RegisterRequest, isFormSubmit } = UserStore();

    const onFormSubmit = async () => {
        if (!RegisterFormData.email || !RegisterFormData.email.includes('@')) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (!RegisterFormData.password || RegisterFormData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        if (RegisterFormData.password !== RegisterFormData.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        let res = await RegisterRequest(RegisterFormData.email, RegisterFormData.password);
        if (res) {
            toast.success("Registration complete! Please login.");
            navigate("/login");
        } else {
            toast.error("Email already registered or something went wrong.");
        }
    };

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Create Account</h4>
                        <p className="text-muted">Enter your email and password to register.</p>

                        <input
                            value={RegisterFormData.email}
                            onChange={(e) => RegisterFormOnChange('email', e.target.value)}
                            placeholder="Email Address"
                            type="email"
                            className="form-control mb-3"
                        />
                        <input
                            value={RegisterFormData.password || ""}
                            onChange={(e) => RegisterFormOnChange('password', e.target.value)}
                            placeholder="Password (min 6 characters)"
                            type="password"
                            className="form-control mb-3"
                        />
                        <input
                            value={RegisterFormData.confirm_password || ""}
                            onChange={(e) => RegisterFormOnChange('confirm_password', e.target.value)}
                            placeholder="Confirm Password"
                            type="password"
                            className="form-control"
                        />

                        <button
                            onClick={onFormSubmit}
                            disabled={isFormSubmit}
                            className="btn mt-3 btn-success"
                        >
                            {isFormSubmit ? (
                                <><span className="spinner-border spinner-border-sm me-2"></span>Registering...</>
                            ) : "Register"}
                        </button>

                        <p className="mt-3 text-center mb-0">
                            Already have an account? <Link to="/login" className="text-success">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
