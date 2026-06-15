import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";
import "../../assets/css/main.css";
import coretech from '../../assets/images/CoreVault.svg';
import ProductStore from "../../store/ProductStore";
import UserStore from "../../store/UserStroe";
import CartStore from "../../store/CartStore";
import WishStore from "../../store/WishStroe";
import SubmitButton from "../user/UserSubmitButton";

const AppNavBar = () => {
    const navigate = useNavigate();
    const { SetSearchKeyword, SearchKeyword } = ProductStore();
    const { isLogin, UserLogoutRequest, getUserEmail } = UserStore();
    const { CartCount, CartListRequest } = CartStore();
    const { WishCount, WishList, WishListRequest } = WishStore();

    useEffect(() => {
        if (isLogin()) {
            CartListRequest();
            WishListRequest();
        }
    }, []);

    // ✅ derive count directly from WishList array as fallback
    const wishCount = WishCount || WishList?.length || 0;

    const getInitial = () => {
        const email = getUserEmail();
        return email ? email.charAt(0).toUpperCase() : "U";
    };

    const onLogout = async () => {
        UserLogoutRequest();
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="container-fluid p-0 sticky-top animate__animated animate__fadeInDown">

            {/* Top Bar */}
            <div className="text-white p-2 bg-success px-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="d-flex gap-3">
                        <span className="f-12">
                            <i className="bi bi-envelope me-1"></i>
                            <span className="d-none d-sm-inline">Support@corevault.com</span>
                        </span>
                        <span className="f-12">
                            <i className="bi bi-telephone me-1"></i>01878172552
                        </span>
                    </div>
                    <div className="d-flex gap-3">
                        <i className="bi bi-whatsapp"></i>
                        <i className="bi bi-youtube"></i>
                        <i className="bi bi-facebook"></i>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white border-bottom px-3 py-2">
                <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">

                    {/* Logo */}
                    <Link to="/" className="text-decoration-none flex-shrink-0">
                        <img src={coretech} alt="CoreVault Logo" style={{ height: "50px" }} />
                    </Link>

                    {/* Home - hidden on small */}
                    <div className="d-none d-xl-block flex-shrink-0">
                        <Link to="/" className="text-decoration-none text-dark fw-medium">
                            <i className="bi bi-house me-1"></i>Home
                        </Link>
                    </div>

                    {/* Search Bar - grows to fill space */}
                    <div className="flex-grow-1" style={{ minWidth: "120px", maxWidth: "500px" }}>
                        <div className="input-group input-group-sm">
                            <input
                                onChange={(e) => SetSearchKeyword(e.target.value)}
                                type="search"
                                className="form-control"
                                placeholder="Search products..."
                            />
                            <Link
                                to={SearchKeyword?.length > 0 ? `/by-keyword/${SearchKeyword}` : "/"}
                                className="btn btn-outline-secondary"
                            >
                                <i className="bi bi-search"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="d-flex align-items-center gap-3 flex-shrink-0">

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="text-dark text-decoration-none d-flex flex-column align-items-center position-relative"
                            style={{ minWidth: "36px" }}
                        >
                            <i className="bi bi-bag fs-5"></i>
                            {isLogin() && CartCount > 0 && (
                                <span
                                    className="position-absolute badge rounded-pill bg-success"
                                    style={{ fontSize: "9px", top: "-6px", right: "-8px", minWidth: "18px" }}
                                >
                                    {CartCount}
                                </span>
                            )}
                            <span style={{ fontSize: "9px" }} className="text-muted mt-1">Cart</span>
                        </Link>

                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className="text-dark text-decoration-none d-flex flex-column align-items-center position-relative"
                            style={{ minWidth: "36px" }}
                        >
                            <i className="bi bi-heart fs-5"></i>
                            {isLogin() && wishCount > 0 && (
                                <span
                                    className="position-absolute badge rounded-pill bg-danger"
                                    style={{ fontSize: "9px", top: "-6px", right: "-8px", minWidth: "18px" }}
                                >
                                    {wishCount}
                                </span>
                            )}
                            <span style={{ fontSize: "9px" }} className="text-muted mt-1">Wish</span>
                        </Link>

                        {/* Orders */}
                        <Link
                            to="/orders"
                            className="text-dark text-decoration-none d-flex flex-column align-items-center"
                            style={{ minWidth: "36px" }}
                        >
                           <i class="bi bi-truck fs-5"></i>
                            <span style={{ fontSize: "9px" }} className="text-muted mt-1">Orders</span>
                        </Link>

                        {/* Divider */}
                        <div className="d-none d-sm-block" style={{ width: "1px", height: "32px", backgroundColor: "#dee2e6" }}></div>

                        {isLogin() ? (
                            <div className="d-flex align-items-center gap-2">
                                <SubmitButton
                                    onClick={onLogout}
                                    className="btn btn-success text-white px-3 py-1"
                                    text="Logout"
                                />
                                <Link
                                    to="/profile"
                                    className="btn btn-success text-white d-flex align-items-center gap-2 px-3 py-1"
                                >
                                    <div style={{
                                        width: "26px",
                                        height: "26px",
                                        borderRadius: "50%",
                                        backgroundColor: "white",
                                        color: "#198754",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        fontSize: "13px",
                                        flexShrink: 0
                                    }}>
                                        {getInitial()}
                                    </div>
                                    <span className="d-none d-xl-inline">Profile</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login" className="btn btn-success btn-sm text-white px-3">
                                    Login
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AppNavBar;