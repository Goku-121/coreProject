import React from 'react';
import UserStore from '../../store/UserStroe';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    let navigate = useNavigate();
    let { PasswordLoginFormData, PasswordLoginFormOnChange, LoginWithPasswordRequest, isFormSubmit } = UserStore();

    const existingToken = localStorage.getItem('token') || Cookies.get('token');
    if (existingToken) { navigate('/'); return null; }

    const onFormSubmit = async () => {
        if (!PasswordLoginFormData.email || !PasswordLoginFormData.email.includes('@')) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (!PasswordLoginFormData.password) {
            toast.error("Please enter your password");
            return;
        }

        let res = await LoginWithPasswordRequest(PasswordLoginFormData.email, PasswordLoginFormData.password);

        if (res && res.status === "success") {
            if (res.role === "admin") {
                Cookies.set('adminToken', res.token);
                localStorage.setItem('adminInfo', JSON.stringify({ email: PasswordLoginFormData.email, name: "Admin" }));
                Cookies.remove('token');
                toast.success("Welcome, Admin!");
                navigate("/admin/dashboard");
            } else {
                toast.success("Login successful!");
                navigate("/");
            }
        } else {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Login</h4>
                        <p className="text-muted">Enter your email and password to login.</p>
                        <input value={PasswordLoginFormData.email} onChange={(e) => PasswordLoginFormOnChange('email', e.target.value)} placeholder="Email Address" type="email" className="form-control mb-3" />
                        <input value={PasswordLoginFormData.password || ""} onChange={(e) => PasswordLoginFormOnChange('password', e.target.value)} placeholder="Password" type="password" className="form-control" />
                        <button onClick={onFormSubmit} disabled={isFormSubmit} className="btn mt-3 btn-success">
                            {isFormSubmit ? <><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</> : "Login"}
                        </button>
                        <p className="mt-3 text-center mb-0">
                            Don't have an account? <Link to="/register" className="text-success">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;